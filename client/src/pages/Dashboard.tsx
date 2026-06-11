import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Plus, Trash2, Edit, Upload, Eye, EyeOff, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

interface Project {
  id: number;
  name: string;
  description: string;
  image: string;
  technology: string[];
  url?: string;
  github?: string;
  featured?: boolean;
  images?: Array<{ id: number; src: string; alt: string; category: string; type: 'image' | 'video'; thumbnail?: string }>;
}

export const Dashboard = () => {
  const navigate = useNavigate();
  const [token] = useState<string | null>(localStorage.getItem('adminToken'));
  const [projects, setProjects] = useState<Project[]>([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [uploadingImagesFor, setUploadingImagesFor] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<'projects' | 'cv' | 'profile' | 'password'>('projects');

  const handleUnauthorized = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_URL}/projects`);
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchProjects();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setShowProjectForm(false);
  };

  const handleUpdateProject = async (id: number, data: FormData) => {
    if (!token) return;
    try {
      const response = await fetch(`${API_URL}/projects/${id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });
      if (response.status === 401) { handleUnauthorized(); return; }
      if (response.ok) { setEditingProject(null); fetchProjects(); }
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!token) return;
    if (!confirm('¿Eliminar proyecto?')) return;
    try {
      const response = await fetch(`${API_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 401) { handleUnauthorized(); return; }
      if (response.ok) setProjects(projects.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const tabs = [
    { id: 'projects', label: '📁 Proyectos' },
    { id: 'cv',       label: '📄 Mi CV' },
    { id: 'profile',  label: '👤 Foto de Perfil' },
    { id: 'password', label: '🔒 Contraseña' },
  ] as const;

  return (
    <div className="min-h-screen bg-[#0c0f0f] pt-20 sm:pt-24 px-4 sm:px-6 md:px-10 relative overflow-hidden">
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(0,255,194,0.06) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-20%] right-[-15%] w-[50%] h-[50%] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(0,255,194,0.05) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-[1280px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-16"
        >
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold mb-3" style={{
              background: 'linear-gradient(135deg, #e2e2e2 0%, #b9cbc1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Panel Administrativo
            </h1>
            <p className="text-[#83958c]">Gestiona y publica tus proyectos</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300"
            style={{
              background: 'rgba(255,59,48,0.10)',
              border: '1px solid rgba(255,59,48,0.30)',
              color: '#ff6b5b'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,59,48,0.20)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,59,48,0.10)'; }}
          >
            <LogOut className="h-4 w-4" /> Cerrar Sesión
          </motion.button>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 flex flex-wrap gap-2 sm:gap-3"
        >
          {tabs.map(({ id, label }) => (
            <motion.button
              key={id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setActiveTab(id as any);
                setShowProjectForm(false);
                setEditingProject(null);
                setUploadingImagesFor(null);
              }}
              className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300"
              style={{
                background: activeTab === id ? 'linear-gradient(135deg, #00ffc2 0%, #00e1ab 100%)' : 'rgba(0,255,194,0.10)',
                color: activeTab === id ? '#003828' : '#00ffc2',
                border: activeTab === id ? 'none' : '1px solid rgba(0,255,194,0.25)',
              }}
            >
              {label}
            </motion.button>
          ))}
        </motion.div>

        {/* ── Tab: Proyectos ── */}
        {activeTab === 'projects' && (
          <>
            {/* New Project Button */}
            {!showProjectForm && !editingProject && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                onClick={() => setShowProjectForm(true)}
                className="flex items-center gap-2 mb-8 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300"
                style={{
                  background: 'rgba(0,255,194,0.12)',
                  border: '1px solid rgba(0,255,194,0.30)',
                  color: '#00ffc2'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,255,194,0.22)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,255,194,0.12)'; }}
              >
                <Plus className="h-4 w-4" /> Nuevo Proyecto
              </motion.button>
            )}

            {/* Project Form */}
            <AnimatePresence>
              {showProjectForm && (
                <ProjectForm
                  token={token}
                  onSuccess={() => { fetchProjects(); setShowProjectForm(false); }}
                  onCancel={() => setShowProjectForm(false)}
                  onUnauthorized={handleUnauthorized}
                />
              )}
            </AnimatePresence>

            {/* Edit Form */}
            <AnimatePresence>
              {editingProject && (
                <EditProjectForm
                  project={editingProject}
                  token={token}
                  onUpdate={handleUpdateProject}
                  onCancel={() => setEditingProject(null)}
                />
              )}
            </AnimatePresence>

            {/* Upload Images Form (inline) */}
            <AnimatePresence>
              {uploadingImagesFor && (
                <UploadImagesForm
                  project={uploadingImagesFor}
                  token={token}
                  onSuccess={() => { fetchProjects(); }}
                  onCancel={() => setUploadingImagesFor(null)}
                  onUnauthorized={handleUnauthorized}
                />
              )}
            </AnimatePresence>

            {/* Projects Grid */}
            {!showProjectForm && !editingProject && !uploadingImagesFor && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <AnimatePresence>
                  {projects.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="col-span-full flex items-center justify-center py-16"
                    >
                      <p className="text-center text-[#83958c]">Sin proyectos aún. ¡Crea tu primer proyecto!</p>
                    </motion.div>
                  ) : (
                    projects.map((project, i) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: i * 0.05 }}
                        className="group rounded-2xl overflow-hidden transition-all duration-500"
                        style={{
                          background: 'rgba(18,20,20,0.60)',
                          backdropFilter: 'blur(12px)',
                          border: '1px solid rgba(0,255,194,0.15)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(0,255,194,0.40)';
                          e.currentTarget.style.background = 'rgba(18,20,20,0.80)';
                          e.currentTarget.style.boxShadow = '0 0 30px -8px rgba(0,255,194,0.30)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(0,255,194,0.15)';
                          e.currentTarget.style.background = 'rgba(18,20,20,0.60)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <div className="relative h-40 sm:h-48 overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0" style={{
                            background: 'linear-gradient(to top, rgba(12,15,15,0.95) 0%, transparent 100%)'
                          }} />
                          {project.featured && (
                            <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full"
                              style={{ background: 'rgba(0,255,194,0.20)', color: '#00ffc2', border: '1px solid rgba(0,255,194,0.40)' }}>
                              Destacado
                            </span>
                          )}
                        </div>

                        <div className="p-4 sm:p-6">
                          <h3 className="text-lg font-bold text-[#e2e2e2] mb-2 line-clamp-1">{project.name}</h3>
                          <p className="text-sm text-[#83958c] mb-4 line-clamp-2">{project.description}</p>

                          <div className="flex flex-wrap gap-1.5 mb-6">
                            {project.technology.slice(0, 3).map((tech) => (
                              <span key={tech} className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                                style={{ background: 'rgba(0,255,194,0.12)', color: '#00ffc2', border: '1px solid rgba(0,255,194,0.25)' }}>
                                {tech}
                              </span>
                            ))}
                          </div>

                          <div className="flex flex-col gap-3">
                            <div className="flex gap-3">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleEditProject(project)}
                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all"
                                style={{ background: 'rgba(0,255,194,0.12)', color: '#00ffc2', border: '1px solid rgba(0,255,194,0.25)' }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,255,194,0.25)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,255,194,0.12)'; }}
                              >
                                <Edit className="h-4 w-4" /> Editar
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleDeleteProject(project.id)}
                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all"
                                style={{ background: 'rgba(255,59,48,0.12)', color: '#ff6b5b', border: '1px solid rgba(255,59,48,0.25)' }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,59,48,0.25)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,59,48,0.12)'; }}
                              >
                                <Trash2 className="h-4 w-4" /> Eliminar
                              </motion.button>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setUploadingImagesFor(project)}
                              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all"
                              style={{ background: 'rgba(0,200,200,0.12)', color: '#00d4d4', border: '1px solid rgba(0,200,200,0.25)' }}
                              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,200,200,0.25)'; }}
                              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,200,200,0.12)'; }}
                            >
                              <Upload className="h-4 w-4" /> Imágenes
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            )}
          </>
        )}

        {/* ── Tab: Mi CV ── */}
        {activeTab === 'cv' && (
          <CvUploadSection token={token} onUnauthorized={handleUnauthorized} />
        )}

        {/* ── Tab: Foto de Perfil ── */}
        {activeTab === 'profile' && (
          <ProfilePhotoSection token={token} onUnauthorized={handleUnauthorized} />
        )}

        {/* ── Tab: Contraseña ── */}
        {activeTab === 'password' && (
          <ChangePasswordForm
            token={token}
            onSuccess={() => {}}
            onCancel={() => {}}
            onUnauthorized={handleUnauthorized}
          />
        )}
      </div>
    </div>
  );
};


/* ─────────────────────────────────────────
   CV Upload Section
───────────────────────────────────────── */
const CvUploadSection = ({
  token,
  onUnauthorized,
}: {
  token: string | null;
  onUnauthorized: () => void;
}) => {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/cv/current`)
      .then(r => r.json())
      .then(d => setCurrentUrl(d.url))
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvFile) { setError('Selecciona un archivo PDF'); return; }
    setError('');
    setSuccess(false);
    setIsLoading(true);

    try {
      const form = new FormData();
      form.append('cv', cvFile);

      const response = await fetch(`${API_URL}/cv/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });

      if (response.status === 401) { onUnauthorized(); return; }

      if (response.ok) {
        const data = await response.json();
        setCurrentUrl(data.url);
        setCvFile(null);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 4000);
      } else {
        const data = await response.json();
        setError(data.error || 'Error al subir el CV');
      }
    } catch {
      setError('Error de conexión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-xl"
    >
      <div className="rounded-2xl p-8 backdrop-blur-xl"
        style={{ background: 'rgba(18,20,20,0.70)', border: '1px solid rgba(0,255,194,0.25)', boxShadow: '0 0 30px -8px rgba(0,255,194,0.20)' }}>
        <h2 className="text-2xl font-bold mb-2" style={{
          background: 'linear-gradient(135deg, #00ffc2 0%, #00e1ab 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Mi Currículum
        </h2>
        <p className="text-[#83958c] text-sm mb-8">Sube o actualiza tu CV en formato PDF.</p>

        {/* Current CV */}
        {currentUrl && (
          <div className="mb-8 p-4 rounded-xl flex items-center justify-between gap-4"
            style={{ background: 'rgba(0,255,194,0.06)', border: '1px solid rgba(0,255,194,0.20)' }}>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#00ffc2] mb-1">CV Actual</p>
              <p className="text-xs text-[#83958c] truncate max-w-[240px]">{currentUrl.split('/').pop()}</p>
            </div>
            <a
              href={currentUrl}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all"
              style={{ background: 'rgba(0,255,194,0.15)', color: '#00ffc2', border: '1px solid rgba(0,255,194,0.30)' }}
            >
              Ver PDF
            </a>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#00ffc2] mb-2.5">
              Nuevo CV (PDF)
            </label>
            <div
              className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300"
              style={{
                borderColor: cvFile ? 'rgba(0,255,194,0.50)' : 'rgba(0,255,194,0.25)',
                background: cvFile ? 'rgba(0,255,194,0.08)' : 'rgba(0,255,194,0.03)',
              }}
            >
              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                className="hidden"
                id="cv-input"
              />
              <label htmlFor="cv-input" className="cursor-pointer flex flex-col items-center gap-3">
                <div className="p-3 rounded-xl" style={{ background: 'rgba(0,255,194,0.15)' }}>
                  <Upload className="h-6 w-6 text-[#00ffc2]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#00ffc2]">
                    {cvFile ? cvFile.name : 'Clic o arrastra para subir'}
                  </p>
                  <p className="text-xs text-[#83958c] mt-1">Solo PDF (máx. 50MB)</p>
                </div>
              </label>
            </div>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="px-4 py-3 rounded-xl text-sm"
              style={{ background: 'rgba(255,59,48,0.10)', color: '#ff6b5b', border: '1px solid rgba(255,59,48,0.25)' }}>
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="px-4 py-3 rounded-xl text-sm"
              style={{ background: 'rgba(0,255,194,0.10)', color: '#00ffc2', border: '1px solid rgba(0,255,194,0.25)' }}>
              ✓ CV actualizado exitosamente
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading || !cvFile}
            className="py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(135deg, #00ffc2 0%, #00e1ab 100%)',
              color: '#003828',
              boxShadow: '0 0 24px rgba(0,255,194,0.25)',
            }}
          >
            {isLoading ? 'Subiendo...' : 'Subir CV'}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   Profile Photo Section
───────────────────────────────────────── */
const ProfilePhotoSection = ({
  token,
  onUnauthorized,
}: {
  token: string | null;
  onUnauthorized: () => void;
}) => {
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/settings/profile-photo`)
      .then(r => r.json())
      .then(d => setCurrentUrl(d.url))
      .catch(() => {});
  }, []);

  const handleSelect = (file: File | null) => {
    setPhotoFile(file);
    setError('');
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoFile) { setError('Selecciona una imagen'); return; }
    setError('');
    setSuccess(false);
    setIsLoading(true);

    try {
      const form = new FormData();
      form.append('photo', photoFile);

      const response = await fetch(`${API_URL}/settings/profile-photo`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });

      if (response.status === 401) { onUnauthorized(); return; }

      if (response.ok) {
        const data = await response.json();
        setCurrentUrl(data.url);
        setPhotoFile(null);
        setPreview(null);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 4000);
      } else {
        const text = await response.text();
        try { setError(JSON.parse(text).error); } catch { setError(`Error ${response.status}`); }
      }
    } catch {
      setError('Error de conexión');
    } finally {
      setIsLoading(false);
    }
  };

  const displayImage = preview || currentUrl || '/images/photo/portafolio_photo.jpg';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-xl"
    >
      <div className="rounded-2xl p-8 backdrop-blur-xl"
        style={{ background: 'rgba(18,20,20,0.70)', border: '1px solid rgba(0,255,194,0.25)', boxShadow: '0 0 30px -8px rgba(0,255,194,0.20)' }}>
        <h2 className="text-2xl font-bold mb-2" style={{
          background: 'linear-gradient(135deg, #00ffc2 0%, #00e1ab 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Foto de Perfil
        </h2>
        <p className="text-[#83958c] text-sm mb-8">Actualiza la foto que aparece en la portada de tu portafolio.</p>

        {/* Current / preview photo */}
        <div className="flex justify-center mb-8">
          <div className="relative rounded-2xl overflow-hidden"
            style={{ width: '200px', height: '200px', border: '1px solid rgba(0,255,194,0.30)' }}>
            <img src={displayImage} alt="Perfil" className="w-full h-full object-cover object-[center_10%]" />
            {preview && (
              <div className="absolute top-2 right-2 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest"
                style={{ background: 'rgba(0,255,194,0.85)', color: '#003828' }}>
                Vista previa
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#00ffc2] mb-2.5">
              Nueva Foto
            </label>
            <div
              className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300"
              style={{
                borderColor: photoFile ? 'rgba(0,255,194,0.50)' : 'rgba(0,255,194,0.25)',
                background: photoFile ? 'rgba(0,255,194,0.08)' : 'rgba(0,255,194,0.03)',
              }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleSelect(e.target.files?.[0] || null)}
                className="hidden"
                id="photo-input"
              />
              <label htmlFor="photo-input" className="cursor-pointer flex flex-col items-center gap-3">
                <div className="p-3 rounded-xl" style={{ background: 'rgba(0,255,194,0.15)' }}>
                  <Upload className="h-6 w-6 text-[#00ffc2]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#00ffc2]">
                    {photoFile ? photoFile.name : 'Clic o arrastra para subir'}
                  </p>
                  <p className="text-xs text-[#83958c] mt-1">JPG, PNG o WebP (máx. 50MB)</p>
                </div>
              </label>
            </div>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="px-4 py-3 rounded-xl text-sm"
              style={{ background: 'rgba(255,59,48,0.10)', color: '#ff6b5b', border: '1px solid rgba(255,59,48,0.25)' }}>
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="px-4 py-3 rounded-xl text-sm"
              style={{ background: 'rgba(0,255,194,0.10)', color: '#00ffc2', border: '1px solid rgba(0,255,194,0.25)' }}>
              ✓ Foto de perfil actualizada exitosamente
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading || !photoFile}
            className="py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(135deg, #00ffc2 0%, #00e1ab 100%)',
              color: '#003828',
              boxShadow: '0 0 24px rgba(0,255,194,0.25)',
            }}
          >
            {isLoading ? 'Subiendo...' : 'Actualizar Foto'}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   Project Form (Nuevo Proyecto)
───────────────────────────────────────── */
interface ProjectFormProps {
  token: string | null;
  onSuccess: () => void;
  onCancel: () => void;
  onUnauthorized: () => void;
}

const ProjectForm = ({ token, onSuccess, onCancel, onUnauthorized }: ProjectFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ name: '', description: '', technology: '', url: '', github: '' });
  const [featured, setFeatured] = useState(false);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<Array<{ file: File; alt: string; category: string; type: 'image' | 'video' }>>([]);

  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(0,255,194,0.15)',
  };
  const focusStyle = { borderColor: 'rgba(0,255,194,0.4)', background: 'rgba(255,255,255,0.06)' };
  const blurStyle = { borderColor: 'rgba(0,255,194,0.15)', background: 'rgba(255,255,255,0.04)' };
  const inputClass = 'w-full px-4 py-3.5 rounded-xl text-[#e2e2e2] placeholder-[#3a4a43] focus:outline-none transition-all duration-300';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const form = new FormData();
      form.append('name', formData.name);
      form.append('description', formData.description);
      form.append('technology', formData.technology);
      form.append('featured', String(featured));
      if (formData.url) form.append('url', formData.url);
      if (formData.github) form.append('github', formData.github);
      if (thumbnail) form.append('thumbnail', thumbnail);

      const response = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });

      const data = await response.json();
      if (response.status === 401) { onUnauthorized(); return; }
      if (!response.ok) { setError(data.error || 'Error al crear proyecto'); setIsLoading(false); return; }

      const projectId = data.id;
      for (const img of galleryImages) {
        const imageForm = new FormData();
        imageForm.append('image', img.file);
        imageForm.append('alt', img.alt);
        imageForm.append('category', img.category);
        imageForm.append('type', img.type);
        await fetch(`${API_URL}/projects/${projectId}/images`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: imageForm,
        });
      }

      onSuccess();
    } catch {
      setError('Error de conexión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl p-8 mb-12 backdrop-blur-xl"
      style={{ background: 'rgba(18,20,20,0.70)', border: '1px solid rgba(0,255,194,0.25)', boxShadow: '0 0 30px -8px rgba(0,255,194,0.20)' }}
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold" style={{
          background: 'linear-gradient(135deg, #00ffc2 0%, #00e1ab 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Nuevo Proyecto
        </h2>
        <button onClick={onCancel} className="p-2 rounded-lg text-[#83958c] hover:text-[#e2e2e2] transition-colors">
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-[#00ffc2] mb-2.5">Nombre del Proyecto</label>
          <input type="text" required value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Mi Proyecto Increíble" className={inputClass} style={inputStyle}
            onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
            onBlur={(e) => Object.assign(e.currentTarget.style, blurStyle)} />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-[#00ffc2] mb-2.5">Descripción</label>
          <textarea required rows={4} value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe qué hace tu proyecto..."
            className={`${inputClass} resize-none`} style={inputStyle}
            onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
            onBlur={(e) => Object.assign(e.currentTarget.style, blurStyle)} />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-[#00ffc2] mb-2.5">Tecnologías (separadas por comas)</label>
          <input type="text" required value={formData.technology}
            onChange={(e) => setFormData({ ...formData, technology: e.target.value })}
            placeholder="React, TypeScript, Tailwind, Node.js" className={inputClass} style={inputStyle}
            onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
            onBlur={(e) => Object.assign(e.currentTarget.style, blurStyle)} />
        </div>

        <label className="flex items-center gap-3 cursor-pointer w-fit">
          <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)}
            className="h-5 w-5 rounded accent-[#00ffc2] cursor-pointer" />
          <div>
            <span className="block text-xs font-bold uppercase tracking-widest text-[#00ffc2]">Trabajo Destacado</span>
            <span className="block text-xs text-[#83958c] mt-0.5">Si no se marca, aparece en "Proyectos de Aprendizaje"</span>
          </div>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#00ffc2] mb-2.5">URL del Proyecto</label>
            <input type="url" value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="https://proyecto.com" className={inputClass} style={inputStyle}
              onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
              onBlur={(e) => Object.assign(e.currentTarget.style, blurStyle)} />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#00ffc2] mb-2.5">GitHub</label>
            <input type="url" value={formData.github}
              onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              placeholder="https://github.com/usuario/repo" className={inputClass} style={inputStyle}
              onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
              onBlur={(e) => Object.assign(e.currentTarget.style, blurStyle)} />
          </div>
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-[#00ffc2] mb-2.5">Imagen de Portada</label>
          <div className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300"
            style={{ borderColor: thumbnail ? 'rgba(0,255,194,0.40)' : 'rgba(0,255,194,0.25)', background: thumbnail ? 'rgba(0,255,194,0.08)' : 'rgba(0,255,194,0.03)' }}>
            <input type="file" accept="image/*" onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
              className="hidden" id="thumbnail-input" required />
            <label htmlFor="thumbnail-input" className="cursor-pointer flex flex-col items-center gap-3">
              <div className="p-3 rounded-xl" style={{ background: 'rgba(0,255,194,0.15)' }}>
                <Upload className="h-6 w-6 text-[#00ffc2]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#00ffc2]">{thumbnail ? thumbnail.name : 'Clic o arrastra para subir'}</p>
                <p className="text-xs text-[#83958c] mt-1">PNG, JPG o WebP (máx. 50MB)</p>
              </div>
            </label>
          </div>
        </div>

        {/* Gallery */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <label className="block text-xs font-bold uppercase tracking-widest text-[#00ffc2]">Galería de Imágenes</label>
            <span className="text-xs text-[#83958c]">{galleryImages.length} imagen(es)</span>
          </div>
          <div className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300"
            style={{ borderColor: galleryImages.length > 0 ? 'rgba(0,255,194,0.40)' : 'rgba(0,255,194,0.25)', background: galleryImages.length > 0 ? 'rgba(0,255,194,0.08)' : 'rgba(0,255,194,0.03)' }}>
            <input type="file" accept="image/*,video/*" multiple
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                files.forEach(file => {
                  setGalleryImages(prev => [...prev, { file, alt: `Imagen ${prev.length + 1}`, category: 'Galería', type: file.type.startsWith('video') ? 'video' : 'image' }]);
                });
                e.target.value = '';
              }}
              className="hidden" id="gallery-input" />
            <label htmlFor="gallery-input" className="cursor-pointer flex flex-col items-center gap-3">
              <div className="p-3 rounded-xl" style={{ background: 'rgba(0,255,194,0.15)' }}>
                <Upload className="h-6 w-6 text-[#00ffc2]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#00ffc2]">Clic o arrastra para agregar imágenes/videos</p>
                <p className="text-xs text-[#83958c] mt-1">Soporta múltiples archivos</p>
              </div>
            </label>
          </div>
          {galleryImages.length > 0 && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {galleryImages.map((img, idx) => (
                <div key={idx} className="relative rounded-lg overflow-hidden group"
                  style={{ background: 'rgba(0,255,194,0.08)', border: '1px solid rgba(0,255,194,0.20)', aspectRatio: '1/1' }}>
                  <div className="w-full h-full flex items-center justify-center text-center p-2">
                    <span className="text-xs text-[#b9cbc1] line-clamp-2">{img.file.name}</span>
                  </div>
                  <button type="button" onClick={() => setGalleryImages(prev => prev.filter((_, i) => i !== idx))}
                    className="absolute top-1 right-1 p-1 rounded-lg bg-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <X className="h-3 w-3 text-red-400" />
                  </button>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-sm text-red-400 bg-red-500/10 px-4 py-3 rounded-lg border border-red-500/20">
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-4 pt-4">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            type="submit" disabled={isLoading}
            className="flex-1 py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all duration-300"
            style={{ background: isLoading ? 'rgba(0,255,194,0.5)' : 'linear-gradient(135deg, #00ffc2 0%, #00e1ab 100%)', color: '#003828', boxShadow: '0 0 24px rgba(0,255,194,0.25)' }}>
            {isLoading ? 'Creando...' : 'Crear Proyecto'}
          </motion.button>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            type="button" onClick={onCancel}
            className="px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all duration-300"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)', color: '#83958c' }}>
            Cancelar
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   Edit Project Form
───────────────────────────────────────── */
interface EditProjectFormProps {
  project: Project;
  token: string | null;
  onUpdate: (id: number, data: FormData) => Promise<void>;
  onCancel: () => void;
}

const EditProjectForm = ({ project, token, onUpdate, onCancel }: EditProjectFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: project.name,
    description: project.description,
    technology: project.technology.join(', '),
    url: project.url || '',
    github: project.github || '',
  });
  const [featured, setFeatured] = useState(project.featured ?? false);
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const inputStyle = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(0,255,194,0.15)' };
  const inputClass = 'w-full px-4 py-3.5 rounded-xl text-[#e2e2e2] placeholder-[#3a4a43] focus:outline-none transition-all duration-300';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const form = new FormData();
    form.append('name', formData.name);
    form.append('description', formData.description);
    form.append('technology', formData.technology);
    form.append('featured', String(featured));
    if (formData.url) form.append('url', formData.url);
    if (formData.github) form.append('github', formData.github);
    if (thumbnail) form.append('thumbnail', thumbnail);
    await onUpdate(project.id, form);
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl p-8 mb-12 backdrop-blur-xl"
      style={{ background: 'rgba(18,20,20,0.70)', border: '1px solid rgba(0,255,194,0.25)', boxShadow: '0 0 30px -8px rgba(0,255,194,0.20)' }}
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold" style={{
          background: 'linear-gradient(135deg, #00ffc2 0%, #00e1ab 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Editar Proyecto
        </h2>
        <button onClick={onCancel} className="p-2 rounded-lg text-[#83958c] hover:text-[#e2e2e2] transition-colors">
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-[#00ffc2] mb-2.5">Nombre</label>
          <input type="text" required value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={inputClass} style={inputStyle} />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-[#00ffc2] mb-2.5">Descripción</label>
          <textarea required rows={4} value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className={`${inputClass} resize-none`} style={inputStyle} />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-[#00ffc2] mb-2.5">Tecnologías (separadas por comas)</label>
          <input type="text" required value={formData.technology}
            onChange={(e) => setFormData({ ...formData, technology: e.target.value })}
            className={inputClass} style={inputStyle} />
        </div>

        <label className="flex items-center gap-3 cursor-pointer w-fit">
          <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)}
            className="h-5 w-5 rounded accent-[#00ffc2] cursor-pointer" />
          <div>
            <span className="block text-xs font-bold uppercase tracking-widest text-[#00ffc2]">Trabajo Destacado</span>
            <span className="block text-xs text-[#83958c] mt-0.5">Si no se marca, aparece en "Proyectos de Aprendizaje"</span>
          </div>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#00ffc2] mb-2.5">URL</label>
            <input type="url" value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className={inputClass} style={inputStyle} />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#00ffc2] mb-2.5">GitHub</label>
            <input type="url" value={formData.github}
              onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              className={inputClass} style={inputStyle} />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-[#00ffc2] mb-2.5">Nueva Imagen de Portada (opcional)</label>
          <input type="file" accept="image/*"
            onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
            className="text-sm text-[#83958c]" />
        </div>

        <div className="flex gap-4 pt-4">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            type="submit" disabled={isLoading}
            className="flex-1 py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all duration-300"
            style={{ background: isLoading ? 'rgba(0,255,194,0.5)' : 'linear-gradient(135deg, #00ffc2 0%, #00e1ab 100%)', color: '#003828' }}>
            {isLoading ? 'Guardando...' : 'Guardar Cambios'}
          </motion.button>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            type="button" onClick={onCancel}
            className="px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all duration-300"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)', color: '#83958c' }}>
            Cancelar
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   Change Password Form
───────────────────────────────────────── */
const ChangePasswordForm = ({
  token,
  onSuccess,
  onCancel,
  onUnauthorized
}: {
  token: string | null;
  onSuccess: () => void;
  onCancel: () => void;
  onUnauthorized: () => void;
}) => {
  const [formData, setFormData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setError('Todos los campos son requeridos');
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Las contraseñas nuevas no coinciden');
      return;
    }
    if (formData.newPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(formData),
      });

      if (response.status === 401) { onUnauthorized(); return; }

      if (response.ok) {
        setSuccess(true);
        setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setTimeout(onSuccess, 3000);
      } else {
        const data = await response.json();
        setError(data.error || 'Error al cambiar contraseña');
      }
    } catch {
      setError('Error de conexión');
    } finally {
      setIsLoading(false);
    }
  };

  const pwInput = (
    field: keyof typeof formData,
    show: keyof typeof showPasswords,
    label: string,
    placeholder: string
  ) => (
    <div>
      <label className="block text-xs font-bold uppercase tracking-widest text-[#b9cbc1] mb-2.5">{label}</label>
      <div className="relative">
        <input
          type={showPasswords[show] ? 'text' : 'password'}
          required
          value={formData[field]}
          onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
          placeholder={placeholder}
          className="w-full px-4 py-3.5 pr-12 rounded-xl text-[#e2e2e2] placeholder-[#3a4a43] focus:outline-none transition-all duration-300"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(100,100,100,0.15)' }}
          onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(100,100,100,0.4)'; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(100,100,100,0.15)'; }}
        />
        <button type="button"
          onClick={() => setShowPasswords(prev => ({ ...prev, [show]: !prev[show] }))}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#83958c] hover:text-[#b9cbc1] transition-colors">
          {showPasswords[show] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-md"
    >
      <div className="rounded-2xl p-8 backdrop-blur-xl"
        style={{ background: 'rgba(18,20,20,0.70)', border: '1px solid rgba(100,100,100,0.25)', boxShadow: '0 0 30px -8px rgba(100,100,100,0.15)' }}>
        <h2 className="text-2xl font-bold mb-8 text-[#b9cbc1]">Cambiar Contraseña</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {pwInput('currentPassword', 'current', 'Contraseña Actual', 'Tu contraseña actual')}
          {pwInput('newPassword', 'new', 'Nueva Contraseña', 'Nueva contraseña')}
          {pwInput('confirmPassword', 'confirm', 'Confirmar Contraseña', 'Confirma tu nueva contraseña')}

          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="px-4 py-3 rounded-xl text-sm"
              style={{ background: 'rgba(255,59,48,0.10)', color: '#ff6b5b', border: '1px solid rgba(255,59,48,0.25)' }}>
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="px-4 py-3 rounded-xl text-sm"
              style={{ background: 'rgba(0,255,194,0.10)', color: '#00ffc2', border: '1px solid rgba(0,255,194,0.25)' }}>
              ✓ Contraseña cambiada exitosamente
            </motion.div>
          )}

          <div className="flex gap-3 pt-4">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              type="submit" disabled={isLoading}
              className="flex-1 px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg, #00ffc2 0%, #00e1ab 100%)', color: '#003828', boxShadow: '0 0 24px rgba(0,255,194,0.25)' }}>
              {isLoading ? 'Actualizando...' : 'Cambiar Contraseña'}
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   Upload Images Form
───────────────────────────────────────── */
const UploadImagesForm = ({
  project,
  token,
  onSuccess,
  onCancel,
  onUnauthorized
}: {
  project: Project;
  token: string | null;
  onSuccess: () => void;
  onCancel: () => void;
  onUnauthorized: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({ alt: '', category: '', type: 'image' as 'image' | 'video' });
  const [editingImageId, setEditingImageId] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const resetForm = () => {
    setEditingImageId(null);
    setImageFiles([]);
    setThumbnailFile(null);
    setFormData({ alt: '', category: '', type: 'image' });
    setError('');
  };

  const startEditImage = (img: { id: number; alt: string; category: string; type: 'image' | 'video' }) => {
    setEditingImageId(img.id);
    setFormData({ alt: img.alt, category: img.category, type: img.type });
    setImageFiles([]);
    setThumbnailFile(null);
    setSelectedIds(new Set());
    setError('');
    setSuccess('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    if (!project.images) return;
    if (selectedIds.size === project.images.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(project.images.map(img => img.id)));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (editingImageId) {
      setIsLoading(true);
      try {
        const form = new FormData();
        form.append('alt', formData.alt);
        form.append('category', formData.category);
        form.append('type', formData.type);
        if (imageFiles[0]) form.append('image', imageFiles[0]);
        if (thumbnailFile) form.append('thumbnail', thumbnailFile);

        const response = await fetch(`${API_URL}/projects/${project.id}/images/${editingImageId}`, {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}` },
          body: form,
        });
        if (response.status === 401) { onUnauthorized(); return; }
        if (response.ok) {
          setSuccess('Imagen actualizada');
          setTimeout(() => setSuccess(''), 3000);
          resetForm();
          onSuccess();
        } else {
          const text = await response.text();
          try { setError(JSON.parse(text).error); } catch { setError(`Error ${response.status}`); }
        }
      } catch (err) {
        setError('Error de conexión: ' + (err instanceof Error ? err.message : ''));
      } finally {
        setIsLoading(false);
      }
    } else {
      if (imageFiles.length === 0) { setError('Selecciona al menos un archivo'); return; }
      setIsLoading(true);
      try {
        const form = new FormData();
        imageFiles.forEach(f => form.append('image', f));
        if (formData.alt) form.append('alt', formData.alt);
        if (formData.category) form.append('category', formData.category);
        form.append('type', formData.type);
        if (thumbnailFile) form.append('thumbnail', thumbnailFile);

        const response = await fetch(`${API_URL}/projects/${project.id}/images`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: form,
        });
        if (response.status === 401) { onUnauthorized(); return; }
        if (response.ok) {
          setSuccess(`${imageFiles.length} archivo(s) subido(s)`);
          setTimeout(() => setSuccess(''), 3000);
          resetForm();
          onSuccess();
        } else {
          const text = await response.text();
          try { setError(JSON.parse(text).error); } catch { setError(`Error ${response.status}`); }
        }
      } catch (err) {
        setError('Error de conexión: ' + (err instanceof Error ? err.message : ''));
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDeleteImage = async (imageId: number) => {
    if (!confirm('¿Eliminar imagen?')) return;
    try {
      const response = await fetch(`${API_URL}/projects/${project.id}/images/${imageId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 401) { onUnauthorized(); return; }
      if (response.ok) {
        if (editingImageId === imageId) resetForm();
        selectedIds.delete(imageId);
        setSelectedIds(new Set(selectedIds));
        onSuccess();
      }
    } catch {
      setError('Error al eliminar');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    if (!confirm(`¿Eliminar ${selectedIds.size} imagen(es)?`)) return;
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/projects/${project.id}/images/bulk-delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ids: Array.from(selectedIds) }),
      });
      if (response.status === 401) { onUnauthorized(); return; }
      if (response.ok) {
        setSuccess(`${selectedIds.size} imagen(es) eliminada(s)`);
        setTimeout(() => setSuccess(''), 3000);
        setSelectedIds(new Set());
        if (editingImageId && selectedIds.has(editingImageId)) resetForm();
        onSuccess();
      } else {
        const text = await response.text();
        try { setError(JSON.parse(text).error); } catch { setError(`Error ${response.status}`); }
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setIsLoading(false);
    }
  };

  const fileInputClass = 'w-full px-4 py-3.5 rounded-xl text-[#e2e2e2] file:bg-[#00ffc2] file:text-[#003828] file:border-0 file:px-4 file:py-2.5 file:rounded-lg file:font-bold file:text-sm file:cursor-pointer file:mr-4';
  const fileInputStyle = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(0,255,194,0.15)' };
  const isEditing = editingImageId !== null;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="rounded-2xl p-8 mb-12 backdrop-blur-xl"
      style={{ background: 'rgba(18,20,20,0.70)', border: '1px solid rgba(0,255,194,0.25)' }}>

      <div className="flex items-center justify-between mb-1">
        <h2 className="text-2xl font-bold" style={{
          background: 'linear-gradient(135deg, #00ffc2 0%, #00e1ab 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          {project.name}
        </h2>
        <button onClick={onCancel} className="p-2 rounded-lg text-[#83958c] hover:text-[#e2e2e2] transition-colors">
          <X className="h-5 w-5" />
        </button>
      </div>
      <p className="text-[#83958c] text-sm mb-8">
        {isEditing ? 'Editando imagen — modifica los campos y guarda' : 'Agrega imágenes o videos de muestra al proyecto'}
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-2xl mb-12">
        {/* Editing indicator */}
        {isEditing && (
          <div className="flex items-center justify-between px-4 py-3 rounded-xl"
            style={{ background: 'rgba(0,200,200,0.10)', border: '1px solid rgba(0,200,200,0.30)' }}>
            <span className="text-sm text-[#00d4d4] font-semibold">Editando imagen #{editingImageId}</span>
            <button type="button" onClick={resetForm}
              className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg transition-all"
              style={{ background: 'rgba(255,255,255,0.06)', color: '#83958c', border: '1px solid rgba(255,255,255,0.10)' }}>
              Cancelar edición
            </button>
          </div>
        )}

        {/* Type selector */}
        <div className="flex gap-6">
          {(['image', 'video'] as const).map(t => (
            <label key={t} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={formData.type === t} onChange={() => setFormData({ ...formData, type: t })} className="accent-[#00ffc2]" />
              <span className="text-sm font-semibold text-[#b9cbc1] capitalize">{t === 'image' ? 'Imagen' : 'Video'}</span>
            </label>
          ))}
        </div>

        {/* File input */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-[#00ffc2] mb-2.5">
            {formData.type === 'image' ? 'Imágenes' : 'Video'} {isEditing && '(opcional — solo si quieres reemplazar)'}
          </label>
          <input
            type="file"
            accept={formData.type === 'image' ? 'image/*' : 'video/*'}
            multiple={!isEditing}
            {...(!isEditing ? { required: imageFiles.length === 0 } : {})}
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              if (isEditing) {
                setImageFiles(files.slice(0, 1));
              } else {
                setImageFiles(files);
              }
            }}
            className={fileInputClass} style={fileInputStyle}
          />
          {imageFiles.length > 0 && (
            <p className="text-xs text-[#83958c] mt-2">
              {imageFiles.length === 1 ? `📁 ${imageFiles[0].name}` : `📁 ${imageFiles.length} archivos seleccionados`}
            </p>
          )}
        </div>

        {formData.type === 'video' && (
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#00ffc2] mb-2.5">
              Imagen de Portada {isEditing && '(opcional)'}
            </label>
            <input type="file" accept="image/*"
              onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
              className={fileInputClass} style={fileInputStyle} />
            {thumbnailFile && <p className="text-xs text-[#83958c] mt-2">📁 {thumbnailFile.name}</p>}
          </div>
        )}

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-[#00ffc2] mb-2.5">
            Descripción <span className="text-[#5a6b63] normal-case">(opcional)</span>
          </label>
          <input type="text" value={formData.alt}
            onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
            placeholder="Descripción / texto alternativo"
            className="w-full px-4 py-3.5 rounded-xl text-[#e2e2e2] placeholder-[#3a4a43] focus:outline-none"
            style={fileInputStyle} />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-[#00ffc2] mb-2.5">
            Categoría <span className="text-[#5a6b63] normal-case">(opcional)</span>
          </label>
          <input type="text" value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            placeholder="Categoría (ej: Galería, Demo, UI)"
            className="w-full px-4 py-3.5 rounded-xl text-[#e2e2e2] placeholder-[#3a4a43] focus:outline-none"
            style={fileInputStyle} />
        </div>

        {error && (
          <div className="px-4 py-3 rounded-xl text-sm" style={{ background: 'rgba(255,59,48,0.10)', color: '#ff6b5b', border: '1px solid rgba(255,59,48,0.25)' }}>
            {error}
          </div>
        )}

        {success && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="px-4 py-3 rounded-xl text-sm"
            style={{ background: 'rgba(0,255,194,0.10)', color: '#00ffc2', border: '1px solid rgba(0,255,194,0.25)' }}>
            ✓ {success}
          </motion.div>
        )}

        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          type="submit" disabled={isLoading}
          className="py-4 rounded-xl font-bold text-sm uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: 'linear-gradient(135deg, #00ffc2 0%, #00e1ab 100%)', color: '#003828', boxShadow: '0 0 24px rgba(0,255,194,0.25)' }}>
          {isLoading
            ? (isEditing ? 'Actualizando...' : `Subiendo ${imageFiles.length} archivo(s)...`)
            : (isEditing ? 'Guardar Cambios' : (imageFiles.length > 1 ? `Subir ${imageFiles.length} archivos` : 'Subir Imagen'))
          }
        </motion.button>
      </form>

      {/* Existing images */}
      {project.images && project.images.length > 0 && (
        <div className="pt-8 border-t border-[rgba(0,255,194,0.15)]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#e2e2e2]">
              Imágenes actuales ({project.images.length})
            </h3>
            <div className="flex items-center gap-3">
              <button type="button" onClick={selectAll}
                className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg transition-all"
                style={{ background: 'rgba(0,255,194,0.10)', color: '#00ffc2', border: '1px solid rgba(0,255,194,0.25)' }}>
                {selectedIds.size === project.images.length ? 'Deseleccionar' : 'Seleccionar todo'}
              </button>
              {selectedIds.size > 0 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  type="button"
                  onClick={handleBulkDelete}
                  disabled={isLoading}
                  className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg transition-all disabled:opacity-50"
                  style={{ background: 'rgba(255,59,48,0.15)', color: '#ff6b5b', border: '1px solid rgba(255,59,48,0.35)' }}>
                  <Trash2 className="h-3.5 w-3.5" /> Eliminar ({selectedIds.size})
                </motion.button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {project.images.map((img) => {
              const isSelected = selectedIds.has(img.id);
              return (
                <motion.div key={img.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="relative group rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => toggleSelect(img.id)}
                  style={{
                    background: 'rgba(18,20,20,0.60)',
                    border: editingImageId === img.id ? '2px solid #00ffc2' : isSelected ? '2px solid #ff6b5b' : '1px solid rgba(0,255,194,0.15)',
                    aspectRatio: '1/1',
                  }}>
                  {/* Selection checkbox */}
                  <div className={`absolute top-2 left-2 z-10 w-5 h-5 rounded flex items-center justify-center transition-all ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                    style={{ background: isSelected ? '#ff6b5b' : 'rgba(0,0,0,0.50)', border: '1px solid rgba(255,255,255,0.30)' }}>
                    {isSelected && <span className="text-white text-xs font-bold">✓</span>}
                  </div>

                  <img src={img.thumbnail || img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  {img.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,255,194,0.80)' }}>
                        <span className="text-[#003828] text-xs font-bold ml-0.5">▶</span>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => startEditImage(img)}
                      className="p-2 rounded-lg transition-all hover:scale-110"
                      style={{ background: 'rgba(0,255,194,0.20)', border: '1px solid rgba(0,255,194,0.40)' }}>
                      <Edit className="h-5 w-5 text-[#00ffc2]" />
                    </button>
                    <button onClick={() => handleDeleteImage(img.id)}
                      className="p-2 rounded-lg transition-all hover:scale-110"
                      style={{ background: 'rgba(255,59,48,0.20)', border: '1px solid rgba(255,59,48,0.40)' }}>
                      <Trash2 className="h-5 w-5 text-[#ff6b5b]" />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 text-xs text-[#b9cbc1] truncate"
                    style={{ background: 'linear-gradient(to top, rgba(12,15,15,0.95) 0%, transparent 100%)' }}>
                    {img.alt || img.category || `#${img.id}`}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
};
