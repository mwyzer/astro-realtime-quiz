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
      if (window.location.port === '4321') {
        return `http://${window.location.hostname}:3001/api/quizzes`;
      }
      return '/api/quizzes';
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
    } catch {
      // Local default fallback
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
    <div className="max-w-5xl mx-auto py-8 px-4 font-sans text-slate-100">
      {/* Toast Notification */}
      {toast && (
        <div 
          role="status"
          className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl border-2 border-black shadow-[4px_4px_0px_#000] flex items-center gap-3 text-sm font-bold transition-all ${
            toast.type === 'success' 
              ? 'bg-emerald-500 text-slate-950' 
              : 'bg-red-500 text-white'
          }`}
        >
          {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0 stroke-[2.5]" /> : <AlertCircle className="w-5 h-5 shrink-0 stroke-[2.5]" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header with CTA to Create */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b-2 border-black">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-bold bg-[#1e293b] text-amber-400 border-2 border-black shadow-[2px_2px_0px_#000] mb-2 uppercase">
            <Sparkles className="w-3.5 h-3.5" /> Manajemen Bank Soal
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk'] tracking-tight">
            Bank Soal Kuis
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Buat paket soal baru, edit pertanyaan, atau sesuaikan durasi setiap ronde.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="arcade-btn inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-6 py-3.5 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000] transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-5 h-5 stroke-[3]" />
          <span>Buat Paket Kuis Baru</span>
        </button>
      </div>

      {/* Quiz List Cards */}
      <div className="space-y-6">
        {quizzes.map((quiz) => (
          <div 
            key={quiz.id}
            className="arcade-card bg-[#151c2c] border-2 border-black rounded-2xl p-6 sm:p-8 shadow-[4px_4px_0px_#000]"
          >
            {/* Top row of card: metadata and action buttons */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b-2 border-black">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs uppercase font-mono font-bold text-amber-400 bg-[#1e293b] border-2 border-black px-2.5 py-0.5 rounded shadow-[1px_1px_0px_#000]">
                    {quiz.category || 'Umum'}
                  </span>
                  <span className="text-xs text-slate-200 font-mono font-bold bg-[#0b0f19] border-2 border-black px-2.5 py-0.5 rounded shadow-[1px_1px_0px_#000]">
                    {quiz.questions.length} Pertanyaan
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white font-['Space_Grotesk'] tracking-tight">
                  {quiz.title}
                </h2>
                <p className="text-slate-300 text-sm mt-1">{quiz.description}</p>
              </div>

              {/* Action buttons (Edit, Delete, Host) */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(quiz)}
                  className="arcade-btn px-4 py-2 rounded-xl bg-[#1e293b] hover:bg-slate-700 text-white text-xs font-bold border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Edit Paket Kuis"
                >
                  <Edit3 className="w-4 h-4 text-amber-400" />
                  <span>Edit</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteQuiz(quiz.id)}
                  className="arcade-btn px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Hapus Paket Kuis"
                >
                  <Trash2 className="w-4 h-4 text-white" />
                  <span>Hapus</span>
                </button>

                <a
                  href="/host"
                  className="arcade-btn px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] flex items-center gap-1.5 transition-all"
                >
                  <span>Host Sekarang</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                </a>
              </div>
            </div>

            {/* Questions Preview Accordion */}
            <div className="mt-6">
              <h3 className="text-xs uppercase font-mono font-bold text-slate-400 tracking-wider mb-4">
                Daftar Soal ({quiz.questions.length}):
              </h3>
              <div className="grid gap-3">
                {quiz.questions.map((q, idx) => (
                  <div key={q.id || idx} className="bg-[#0b0f19] border-2 border-black p-4 rounded-xl shadow-[2px_2px_0px_#000] flex items-start gap-3">
                    <span className="w-7 h-7 bg-amber-400 text-slate-950 font-mono font-black border-2 border-black rounded flex items-center justify-center shrink-0 text-xs shadow-[1px_1px_0px_#000]">
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <p className="text-white font-bold text-sm">{q.text}</p>
                        <span className="text-[11px] font-mono font-bold text-amber-300 bg-[#151c2c] px-2 py-0.5 rounded border border-black shadow-[1px_1px_0px_#000] shrink-0">
                          ⏱ {q.timeLimit || 15}s
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {q.options.map((opt, oIdx) => (
                          <div 
                            key={oIdx}
                            className={`p-2.5 rounded-lg border-2 flex items-center gap-2 ${
                              oIdx === q.correctIndex 
                                ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500 font-bold' 
                                : 'bg-[#151c2c] text-slate-300 border-black'
                            }`}
                          >
                            <span className="font-mono font-black">{['▲','◆','●','■'][oIdx]}</span>
                            <span className="truncate">{opt}</span>
                            {oIdx === q.correctIndex && (
                              <span className="ml-auto text-[10px] bg-emerald-500 text-slate-950 font-black px-1.5 py-0.5 rounded border border-black">
                                Kunci Benar
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                      {q.explanation && (
                        <p className="mt-2 text-xs text-slate-300 bg-[#151c2c] p-2.5 rounded-lg border border-black">
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
          <div className="bg-[#151c2c] border-2 border-black rounded-2xl w-full max-w-3xl my-8 p-6 sm:p-8 shadow-[8px_8px_0px_#000] relative max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b-2 border-black shrink-0">
              <div>
                <h2 className="text-2xl font-black text-white font-['Space_Grotesk'] tracking-tight">
                  {editingQuizId ? 'Edit Paket Kuis' : 'Buat Paket Kuis Baru'}
                </h2>
                <p className="text-slate-400 text-xs mt-1">
                  Atur judul, kategori, pertanyaan, dan tentukan kunci jawabannya.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="arcade-btn p-2 text-slate-300 hover:text-white rounded-xl bg-[#1e293b] hover:bg-slate-700 border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-colors"
                aria-label="Tutup editor modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSaveQuiz} className="flex-1 overflow-y-auto py-6 pr-1 space-y-6">
              {/* Quiz Info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="quiz-title-input" className="block text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-1.5">
                    Judul Kuis *
                  </label>
                  <input
                    id="quiz-title-input"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Kuis Dasar Python, Trivia Musik"
                    className="w-full bg-[#0b0f19] border-2 border-black focus:border-amber-400 focus:outline-none rounded-xl px-4 py-2.5 text-white font-medium text-sm shadow-[2px_2px_0px_#000] transition-all placeholder:text-slate-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="quiz-category-select" className="block text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-1.5">
                    Kategori
                  </label>
                  <select
                    id="quiz-category-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#0b0f19] border-2 border-black focus:border-amber-400 focus:outline-none rounded-xl px-4 py-2.5 text-white font-medium text-sm shadow-[2px_2px_0px_#000] transition-all"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="quiz-description-input" className="block text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-1.5">
                  Deskripsi Kuis
                </label>
                <input
                  id="quiz-description-input"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Deskripsi singkat seputar materi kuis"
                  className="w-full bg-[#0b0f19] border-2 border-black focus:border-amber-400 focus:outline-none rounded-xl px-4 py-2.5 text-white font-medium text-sm shadow-[2px_2px_0px_#000] transition-all placeholder:text-slate-500"
                />
              </div>

              {/* Questions Section */}
              <div className="pt-4 border-t-2 border-black">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-white font-['Space_Grotesk'] flex items-center gap-2">
                    <span>Daftar Pertanyaan</span>
                    <span className="text-xs bg-[#0b0f19] text-amber-400 border-2 border-black px-2.5 py-0.5 rounded-full font-mono font-bold shadow-[1px_1px_0px_#000]">
                      {questions.length}
                    </span>
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="arcade-btn px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 border-2 border-black text-xs font-black shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>Tambah Soal</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {questions.map((q, qIdx) => (
                    <div 
                      key={q.id || qIdx} 
                      className="bg-[#0b0f19] border-2 border-black rounded-xl p-5 shadow-[3px_3px_0px_#000] relative"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-xs font-black text-slate-950 bg-amber-400 border-2 border-black px-2.5 py-1 rounded shadow-[1px_1px_0px_#000]">
                          Soal #{qIdx + 1}
                        </span>

                        <div className="flex items-center gap-3">
                          {/* Time limit selector */}
                          <div className="flex items-center gap-1.5 text-xs text-slate-300">
                            <Clock className="w-4 h-4 text-amber-400" />
                            <label htmlFor={`question-time-${qIdx}`} className="sr-only">Durasi Soal {qIdx + 1}</label>
                            <select
                              id={`question-time-${qIdx}`}
                              value={q.timeLimit || 15}
                              onChange={(e) => handleTimeLimitChange(qIdx, Number(e.target.value))}
                              className="bg-[#151c2c] border-2 border-black rounded-lg px-2 py-1 text-xs text-white font-mono font-bold shadow-[1px_1px_0px_#000] outline-none"
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
                            className="arcade-btn p-1.5 text-white bg-red-600 hover:bg-red-500 border-2 border-black rounded-lg shadow-[1px_1px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-colors cursor-pointer"
                            title="Hapus Soal Ini"
                            aria-label={`Hapus Soal ${qIdx + 1}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Question text input */}
                      <div className="mb-4">
                        <label htmlFor={`question-text-${qIdx}`} className="sr-only">Teks Pertanyaan {qIdx + 1}</label>
                        <input
                          id={`question-text-${qIdx}`}
                          type="text"
                          value={q.text}
                          onChange={(e) => handleQuestionTextChange(qIdx, e.target.value)}
                          placeholder={`Tulis pertanyaan nomor ${qIdx + 1}...`}
                          className="w-full bg-[#151c2c] border-2 border-black focus:border-amber-400 focus:outline-none rounded-xl px-4 py-2.5 text-white font-medium text-sm shadow-[2px_2px_0px_#000]"
                          required
                        />
                      </div>

                      {/* 4 Options Grid */}
                      <p className="text-xs font-mono font-bold text-amber-400 mb-2 uppercase">
                        Pilihan Jawaban (Klik tombol simbol untuk menandai kunci benar):
                      </p>

                      <div className="grid sm:grid-cols-2 gap-3 mb-4">
                        {q.options.map((opt, optIdx) => {
                          const isCorrect = q.correctIndex === optIdx;
                          const shapeTheme = [
                            { symbol: '▲', color: 'bg-red-600 text-white' },
                            { symbol: '◆', color: 'bg-blue-600 text-white' },
                            { symbol: '●', color: 'bg-amber-400 text-slate-950 font-black' },
                            { symbol: '■', color: 'bg-emerald-600 text-white' }
                          ][optIdx];

                          return (
                            <div 
                              key={optIdx} 
                              className={`flex items-center gap-2 bg-[#151c2c] border-2 rounded-xl p-2 transition-all ${
                                isCorrect 
                                  ? 'border-emerald-500 shadow-[2px_2px_0px_#10b981]' 
                                  : 'border-black shadow-[2px_2px_0px_#000]'
                              }`}
                            >
                              <button
                                type="button"
                                onClick={() => handleCorrectIndexChange(qIdx, optIdx)}
                                className={`w-8 h-8 rounded-lg border-2 border-black flex items-center justify-center font-black text-xs shrink-0 transition-transform ${
                                  isCorrect 
                                    ? 'bg-emerald-500 text-slate-950 shadow-[1px_1px_0px_#000]' 
                                    : `${shapeTheme.color} shadow-[1px_1px_0px_#000] hover:opacity-90`
                                }`}
                                title={isCorrect ? 'Kunci Benar' : 'Jadikan Kunci Benar'}
                                aria-label={`Pilih Opsi ${['A', 'B', 'C', 'D'][optIdx]} sebagai kunci benar`}
                              >
                                {isCorrect ? <Check className="w-4 h-4 stroke-[3]" /> : shapeTheme.symbol}
                              </button>

                              <label htmlFor={`question-${qIdx}-opt-${optIdx}`} className="sr-only">{`Opsi ${['A', 'B', 'C', 'D'][optIdx]}`}</label>
                              <input
                                id={`question-${qIdx}-opt-${optIdx}`}
                                type="text"
                                value={opt}
                                onChange={(e) => handleOptionChange(qIdx, optIdx, e.target.value)}
                                placeholder={`Opsi ${['A', 'B', 'C', 'D'][optIdx]}`}
                                className="w-full bg-transparent text-white font-medium text-xs outline-none px-2 py-1"
                                required
                              />
                            </div>
                          );
                        })}
                      </div>

                      {/* Explanation input */}
                      <div>
                        <label htmlFor={`question-expl-${qIdx}`} className="sr-only">Penjelasan Jawaban Soal {qIdx + 1}</label>
                        <input
                          id={`question-expl-${qIdx}`}
                          type="text"
                          value={q.explanation || ''}
                          onChange={(e) => handleExplanationChange(qIdx, e.target.value)}
                          placeholder="Penjelasan jawaban setelah waktu habis (opsional)"
                          className="w-full bg-[#151c2c] border-2 border-black focus:border-amber-400 focus:outline-none rounded-xl px-3 py-2 text-slate-300 text-xs shadow-[2px_2px_0px_#000]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Submission Buttons */}
              <div className="pt-4 border-t-2 border-black flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="arcade-btn px-5 py-2.5 rounded-xl bg-[#1e293b] hover:bg-slate-700 text-slate-200 text-sm font-bold border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="arcade-btn px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-sm font-black border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000] flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4 stroke-[2.5]" />
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
