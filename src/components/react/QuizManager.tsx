import React, { useState, useEffect } from 'react';
import type { QuizData, QuizQuestion } from '../../types/quiz';
import { DEFAULT_QUIZZES } from '../../data/default-quizzes';
import { 
  Plus, Edit3, Trash2, CheckCircle2, AlertCircle, 
  ArrowRight, X, Clock, HelpCircle, Save, FolderOpen,
  Sparkles, Check
} from 'lucide-react';

const CATEGORIES = ['Technology', 'Science', 'Umum', 'Edukasi', 'Pop Culture', 'Lainnya'];
const TIME_LIMITS = [10, 15, 20, 30, 45, 60];

const EMPTY_QUESTION: QuizQuestion = {
  id: '',
  text: '',
  options: ['', '', '', ''],
  correctIndex: 0,
  timeLimit: 15,
  explanation: '',
};

export default function QuizManager() {
  const [quizzes, setQuizzes] = useState<QuizData[]>(DEFAULT_QUIZZES);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Editor Modal State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingQuizId, setEditingQuizId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Technology');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<QuizQuestion[]>([
    { ...EMPTY_QUESTION, id: 'q_' + Date.now() }
  ]);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const getApiUrl = () => {
    if (typeof window !== 'undefined') {
      return `http://${window.location.hostname}:3001/api/quizzes`;
    }
    return 'http://localhost:3001/api/quizzes';
  };

  // Fetch all quizzes from server
  const loadQuizzes = async () => {
    try {
      const res = await fetch(getApiUrl());
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setQuizzes(data);
        }
      }
    } catch (err) {
      console.warn('Gagal memuat kuis dari API backend, menggunakan data default lokal.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuizzes();
  }, []);

  // Open Editor for Creating New Quiz
  const handleOpenCreate = () => {
    setEditingQuizId(null);
    setTitle('');
    setCategory('Technology');
    setDescription('');
    setQuestions([
      {
        id: 'q_' + Date.now(),
        text: '',
        options: ['', '', '', ''],
        correctIndex: 0,
        timeLimit: 15,
        explanation: '',
      }
    ]);
    setIsEditorOpen(true);
  };

  // Open Editor for Updating an Existing Quiz
  const handleOpenEdit = (quiz: QuizData) => {
    setEditingQuizId(quiz.id);
    setTitle(quiz.title);
    setCategory(quiz.category || 'Technology');
    setDescription(quiz.description || '');
    setQuestions(JSON.parse(JSON.stringify(quiz.questions)));
    setIsEditorOpen(true);
  };

  // Delete a Quiz
  const handleDeleteQuiz = async (quizId: string) => {
    if (quizzes.length <= 1) {
      showToast('error', 'Minimal harus ada 1 paket kuis tersisa!');
      return;
    }

    if (!confirm('Apakah kamu yakin ingin menghapus paket kuis ini?')) {
      return;
    }

    try {
      const res = await fetch(`${getApiUrl()}/${quizId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setQuizzes(prev => prev.filter(q => q.id !== quizId));
        showToast('success', 'Paket kuis berhasil dihapus!');
      } else {
        const err = await res.json();
        showToast('error', err.error || 'Gagal menghapus kuis.');
      }
    } catch {
      // Local fallback
      setQuizzes(prev => prev.filter(q => q.id !== quizId));
      showToast('success', 'Paket kuis berhasil dihapus secara lokal!');
    }
  };

  // Form manipulation for Questions
  const handleAddQuestion = () => {
    setQuestions(prev => [
      ...prev,
      {
        id: 'q_' + Date.now() + Math.random().toString(36).substring(2, 5),
        text: '',
        options: ['', '', '', ''],
        correctIndex: 0,
        timeLimit: 15,
        explanation: '',
      }
    ]);
  };

  const handleRemoveQuestion = (idx: number) => {
    if (questions.length <= 1) {
      showToast('error', 'Setiap paket kuis minimal harus memiliki 1 pertanyaan.');
      return;
    }
    setQuestions(prev => prev.filter((_, i) => i !== idx));
  };

  const handleQuestionTextChange = (idx: number, val: string) => {
    setQuestions(prev => {
      const copy = [...prev];
      copy[idx].text = val;
      return copy;
    });
  };

  const handleOptionChange = (qIdx: number, optIdx: number, val: string) => {
    setQuestions(prev => {
      const copy = [...prev];
      copy[qIdx].options[optIdx] = val;
      return copy;
    });
  };

  const handleCorrectIndexChange = (qIdx: number, correctIdx: number) => {
    setQuestions(prev => {
      const copy = [...prev];
      copy[qIdx].correctIndex = correctIdx;
      return copy;
    });
  };

  const handleTimeLimitChange = (qIdx: number, timeLimit: number) => {
    setQuestions(prev => {
      const copy = [...prev];
      copy[qIdx].timeLimit = timeLimit;
      return copy;
    });
  };

  const handleExplanationChange = (qIdx: number, val: string) => {
    setQuestions(prev => {
      const copy = [...prev];
      copy[qIdx].explanation = val;
      return copy;
    });
  };

  // Save Quiz (Create or Update)
  const handleSaveQuiz = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      showToast('error', 'Judul kuis tidak boleh kosong.');
      return;
    }

    // Validate questions
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.text.trim()) {
        showToast('error', `Pertanyaan #${i + 1} belum memiliki teks soal.`);
        return;
      }
      for (let j = 0; j < 4; j++) {
        if (!q.options[j].trim()) {
          showToast('error', `Pertanyaan #${i + 1}: Opsi jawaban ${['A', 'B', 'C', 'D'][j]} tidak boleh kosong.`);
          return;
        }
      }
    }

    const payload: QuizData = {
      id: editingQuizId || 'quiz_' + Date.now(),
      title: title.trim(),
      description: description.trim() || 'Paket kuis kustom pengguna',
      category: category || 'Umum',
      icon: 'HelpCircle',
      questions: questions.map((q, idx) => ({
        ...q,
        id: q.id || `q_${idx + 1}`
      }))
    };

    try {
      const res = await fetch(getApiUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        showToast('success', editingQuizId ? 'Paket kuis berhasil diperbarui!' : 'Paket kuis baru berhasil dibuat!');
        setIsEditorOpen(false);
        loadQuizzes();
      } else {
        const err = await res.json();
        showToast('error', err.error || 'Gagal menyimpan kuis.');
      }
    } catch {
      // Local state fallback
      setQuizzes(prev => {
        if (editingQuizId) {
          return prev.map(q => q.id === editingQuizId ? payload : q);
        }
        return [...prev, payload];
      });
      showToast('success', 'Paket kuis disimpan secara lokal!');
      setIsEditorOpen(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-bold border transition-all animate-bounce-short ${
          toast.type === 'success' 
            ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/50' 
            : 'bg-red-950/90 text-red-300 border-red-500/50'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header with CTA to Create */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-800">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Manajemen Bank Soal
          </span>
          <h1 className="text-3xl font-extrabold text-white">Bank Soal Kuis</h1>
          <p className="text-slate-400 text-sm mt-1">
            Buat paket soal baru, edit pertanyaan, atau hapus kuis sesuai kebutuhan Anda.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:opacity-95 text-white font-bold px-6 py-3.5 rounded-xl shadow-xl shadow-purple-600/25 transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span>Buat Paket Kuis Baru</span>
        </button>
      </div>

      {/* Quiz List Cards */}
      <div className="space-y-8">
        {quizzes.map((quiz) => (
          <div 
            key={quiz.id}
            className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 sm:p-8 backdrop-blur transition-all shadow-xl"
          >
            {/* Top row of card: metadata and action buttons */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs uppercase font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded-full">
                    {quiz.category || 'Umum'}
                  </span>
                  <span className="text-xs text-slate-400 font-mono bg-slate-800 px-2.5 py-0.5 rounded-full">
                    {quiz.questions.length} Pertanyaan
                  </span>
                </div>
                <h2 className="text-2xl font-black text-white">{quiz.title}</h2>
                <p className="text-slate-300 text-sm mt-1">{quiz.description}</p>
              </div>

              {/* Action buttons (Edit, Delete, Host) */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleOpenEdit(quiz)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Edit Paket Kuis"
                >
                  <Edit3 className="w-4 h-4 text-purple-400" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => handleDeleteQuiz(quiz.id)}
                  className="px-3.5 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 hover:text-red-200 text-xs font-bold border border-red-500/30 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Hapus Paket Kuis"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                  <span>Hapus</span>
                </button>

                <a
                  href="/host"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-purple-600/20 transition-all"
                >
                  <span>Host Sekarang</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Questions Preview Accordion */}
            <div className="mt-6">
              <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-4">
                Daftar Soal ({quiz.questions.length}):
              </h3>
              <div className="grid gap-3">
                {quiz.questions.map((q, idx) => (
                  <div key={q.id || idx} className="bg-slate-800/40 border border-slate-800 p-4 rounded-2xl flex items-start gap-4">
                    <span className="w-7 h-7 bg-purple-500/20 text-purple-300 font-mono font-bold rounded-lg flex items-center justify-center shrink-0 text-xs">
                      {idx + 1}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <p className="text-white font-medium text-sm">{q.text}</p>
                        <span className="text-[11px] font-mono text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/20 shrink-0">
                          ⏱ {q.timeLimit || 15}s
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {q.options.map((opt, oIdx) => (
                          <div 
                            key={oIdx}
                            className={`p-2 rounded-lg flex items-center gap-2 ${
                              oIdx === q.correctIndex 
                                ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 font-semibold' 
                                : 'bg-slate-900/60 text-slate-400'
                            }`}
                          >
                            <span className="font-mono">{['▲','◆','●','■'][oIdx]}</span>
                            <span>{opt}</span>
                            {oIdx === q.correctIndex && (
                              <span className="ml-auto text-[10px] bg-emerald-500/20 px-1.5 py-0.5 rounded text-emerald-300">
                                Kunci Benar
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                      {q.explanation && (
                        <p className="mt-2 text-[11px] text-purple-300/80 bg-purple-950/30 p-2 rounded-lg border border-purple-500/20">
                          💡 <em>{q.explanation}</em>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL / DRAWER: CREATE & UPDATE EDITOR */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-purple-500/30 rounded-3xl w-full max-w-3xl my-8 p-6 sm:p-8 shadow-2xl relative max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
              <div>
                <h2 className="text-2xl font-black text-white">
                  {editingQuizId ? 'Edit Paket Kuis' : 'Buat Paket Kuis Baru'}
                </h2>
                <p className="text-slate-400 text-xs mt-1">
                  Atur judul, kategori, pertanyaan, dan tentukan kunci jawabannya.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSaveQuiz} className="flex-1 overflow-y-auto py-6 pr-1 space-y-6">
              {/* Quiz Info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Judul Kuis *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Kuis Dasar Python, Trivia Musik"
                    className="w-full bg-slate-800 border border-slate-700 focus:border-purple-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all placeholder:text-slate-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Kategori
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 focus:border-purple-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Deskripsi Kuis
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Deskripsi singkat seputar materi kuis"
                  className="w-full bg-slate-800 border border-slate-700 focus:border-purple-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all placeholder:text-slate-500"
                />
              </div>

              {/* Questions Section */}
              <div className="pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Daftar Pertanyaan</span>
                    <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full font-mono">
                      {questions.length}
                    </span>
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="px-3.5 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 border border-purple-500/40 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Soal</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {questions.map((q, qIdx) => (
                    <div 
                      key={q.id || qIdx} 
                      className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-5 relative"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-xs font-bold text-purple-300 bg-purple-500/20 px-2.5 py-1 rounded-lg">
                          Soal #{qIdx + 1}
                        </span>

                        <div className="flex items-center gap-3">
                          {/* Time limit selector */}
                          <div className="flex items-center gap-1 text-xs text-slate-300">
                            <Clock className="w-3.5 h-3.5 text-yellow-400" />
                            <select
                              value={q.timeLimit || 15}
                              onChange={(e) => handleTimeLimitChange(qIdx, Number(e.target.value))}
                              className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white outline-none"
                            >
                              {TIME_LIMITS.map(t => (
                                <option key={t} value={t}>{t} detik</option>
                              ))}
                            </select>
                          </div>

                          {/* Delete question button */}
                          <button
                            type="button"
                            onClick={() => handleRemoveQuestion(qIdx)}
                            className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-lg transition-colors"
                            title="Hapus Soal Ini"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Question text input */}
                      <input
                        type="text"
                        value={q.text}
                        onChange={(e) => handleQuestionTextChange(qIdx, e.target.value)}
                        placeholder={`Tulis pertanyaan nomor ${qIdx + 1}...`}
                        className="w-full bg-slate-900 border border-slate-700 focus:border-purple-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none mb-4"
                        required
                      />

                      {/* 4 Options Grid */}
                      <p className="text-xs font-bold text-slate-400 mb-2">
                        Pilihan Jawaban (Klik tombol lingkaran untuk menandai kunci jawaban yang benar):
                      </p>

                      <div className="grid sm:grid-cols-2 gap-3 mb-4">
                        {q.options.map((opt, optIdx) => {
                          const isCorrect = q.correctIndex === optIdx;
                          const shapeTheme = [
                            { symbol: '▲', color: 'text-red-400', border: 'border-red-500/40' },
                            { symbol: '◆', color: 'text-blue-400', border: 'border-blue-500/40' },
                            { symbol: '●', color: 'text-amber-400', border: 'border-amber-500/40' },
                            { symbol: '■', color: 'text-emerald-400', border: 'border-emerald-500/40' }
                          ][optIdx];

                          return (
                            <div 
                              key={optIdx} 
                              className={`flex items-center gap-2 bg-slate-900/90 border rounded-xl p-2 transition-all ${
                                isCorrect ? 'border-emerald-500 ring-1 ring-emerald-500/50 bg-emerald-950/20' : 'border-slate-700'
                              }`}
                            >
                              <button
                                type="button"
                                onClick={() => handleCorrectIndexChange(qIdx, optIdx)}
                                className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-transform ${
                                  isCorrect 
                                    ? 'bg-emerald-500 text-white scale-105' 
                                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                }`}
                                title={isCorrect ? 'Kunci Benar' : 'Jadikan Kunci Benar'}
                              >
                                {isCorrect ? <Check className="w-4 h-4 stroke-[3]" /> : shapeTheme.symbol}
                              </button>

                              <input
                                type="text"
                                value={opt}
                                onChange={(e) => handleOptionChange(qIdx, optIdx, e.target.value)}
                                placeholder={`Opsi ${['A', 'B', 'C', 'D'][optIdx]}`}
                                className="w-full bg-transparent text-white text-xs outline-none px-2 py-1"
                                required
                              />
                            </div>
                          );
                        })}
                      </div>

                      {/* Explanation input */}
                      <div>
                        <input
                          type="text"
                          value={q.explanation || ''}
                          onChange={(e) => handleExplanationChange(qIdx, e.target.value)}
                          placeholder="Penjelasan jawaban setelah waktu habis (opsional)"
                          className="w-full bg-slate-900/60 border border-slate-700/60 rounded-xl px-3 py-2 text-slate-300 text-xs outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Submission Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-bold transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-bold shadow-lg shadow-purple-600/30 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Paket Kuis</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
