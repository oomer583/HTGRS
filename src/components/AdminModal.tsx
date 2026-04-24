import React, { useState } from 'react';
import { X, Lock, Plus, Trash2, Layout, Image as ImageIcon, Type, AlignLeft, Pencil } from 'lucide-react';
import { collection, addDoc, serverTimestamp, deleteDoc, doc, updateDoc, getDocs, query, collectionGroup, where, getDoc } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import firebaseConfig from '../../firebase-applet-config.json';
import { motion, AnimatePresence } from 'motion/react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  existingProjects: any[];
  setExistingProjects: React.Dispatch<React.SetStateAction<any[]>>;
}

export function AdminModal({ isOpen, onClose, existingProjects, setExistingProjects }: AdminModalProps) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('isAdminAuthenticated') === 'true';
  });
  const [loading, setLoading] = useState(false);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    tags: '',
    github: '',
    link: '',
    isExternal: true
  });

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim() === 'J4J') { 
      setIsAuthenticated(true);
      sessionStorage.setItem('isAdminAuthenticated', 'true');
      setPassword(''); 
    } else {
      alert('Hatalı şifre! Lütfen yönetici şifrenizi kontrol edin.');
    }
  };

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Max dimensions for a portfolio project
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          // Compress as JPEG with 0.7 quality
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
          resolve(compressedDataUrl);
        };
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLoading(true);
      try {
        const compressedBase64 = await compressImage(file);
        
        // Final check for Firestore limit (approx 1MB)
        if (compressedBase64.length > 1000000) {
          alert('Görsel sıkıştırılmasına rağmen çok büyük. Lütfen daha küçük bir dosya deneyin.');
          return;
        }
        
        setFormData({ ...formData, image: compressedBase64 });
      } catch (error) {
        console.error('Image compression failed:', error);
        alert('Görsel işlenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    }
  };

  const startEditing = (project: any) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image,
      tags: project.tags.join(', '),
      github: project.github || '',
      link: project.link || '',
      isExternal: project.isExternal ?? true
    });
    // Scroll to top of modal for visibility
    const modalElement = document.querySelector('.overflow-y-auto');
    if (modalElement) modalElement.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      alert('Lütfen bir görsel seçin.');
      return;
    }
    setLoading(true);
    try {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
      const currentUid = auth.currentUser?.uid;
      
      if (editingId) {
        await updateDoc(doc(db, 'projects', editingId), {
          ...formData,
          tags: tagsArray,
          uid: currentUid // Save UID if available
        });
        alert('Proje güncellendi!');
      } else {
        await addDoc(collection(db, 'projects'), {
          ...formData,
          tags: tagsArray,
          order: existingProjects.length,
          createdAt: serverTimestamp(),
          uid: currentUid // Save UID if available
        });
        alert('Proje eklendi!');
      }

      setEditingId(null);
      setFormData({
        title: '',
        description: '',
        image: '',
        tags: '',
        github: '',
        link: '',
        isExternal: true
      });
    } catch (error: any) {
      console.error(error);
      alert(`Bir hata oluştu: ${error.message || 'Bilinmeyen bir hata'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent, project: any) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log("Silme işlemi tetiklendi. Proje verisi:", project);
    const projectId = project.id;
    console.log("Hedef Document ID:", projectId);

    if (!projectId) {
      console.error("HATA: project.id undefined veya null. Firestore document ID eksik!");
      alert("Hata: Proje ID bulunamadı. Silme işlemi durduruldu.");
      return;
    }

    const ok = window.confirm(`"${project.title || 'Bu projeyi'}" silmek istediğinize emin misiniz?`);
    if (!ok) return;
    
    setLoading(true);
    
    try {
      console.log("--- DEBUG SİLME ÖNCESİ ---");
      console.log("Firebase projectId:", firebaseConfig.projectId);
      console.log("Firestore databaseId:", firebaseConfig.firestoreDatabaseId || "(default)");
      console.log("Hedef Document ID:", projectId);
      console.log("Silinen path:", `projects/${projectId}`);
      console.log("--------------------------");

      // 1. Global projects koleksiyonundan silmeyi dene
      const globalRef = doc(db, "projects", projectId);
      await deleteDoc(globalRef);
      console.log("Global deleteDoc tamamlandı. Doğrulama yapılıyor...");
      
      // VERIFICATION
      const checkDoc = await getDoc(globalRef);
      console.log("Global silme sonrası döküman var mı?", checkDoc.exists());

      // 2. Kullanıcı alt koleksiyonundan silmeyi dene (Eğer veri varsa)
      const uidFromProject = project.uid || project.userId;
      if (uidFromProject) {
        console.log(`Kullanıcı (${uidFromProject}) alt koleksiyonu taranıyor...`);
        const userProjectRef = doc(db, "users", uidFromProject, "projects", projectId);
        await deleteDoc(userProjectRef);
        
        const checkUserDoc = await getDoc(userProjectRef);
        console.log("Alt koleksiyon silme sonrası döküman var mı?", checkUserDoc.exists());
      }

      // 3. UI listesinden kaldır (Optimistic update)
      if (setExistingProjects) {
        setExistingProjects(prev => prev.filter(p => p.id !== projectId));
      }

      console.log("SİLME BAŞARILI. ID:", projectId);
      alert("Proje başarıyla silindi!");
    } catch (error: any) {
      console.error("Firestore silme hatası yakalandı!", error);
      console.error("Hata Kodu:", error.code);
      console.error("Hata Mesajı:", error.message);
      
      let errorMsg = "Proje silinemedi.";
      if (error.code === 'permission-denied') {
        errorMsg = "Hata: Yetkiniz yok (Permission Denied). Lütfen kuralları kontrol edin.";
      }
      
      alert(`${errorMsg}\n\nKod: ${error.code || 'Bilinmeyen'}\nMesaj: ${error.message || ''}`);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card w-full max-w-2xl max-h-[80vh] overflow-y-auto p-8 relative"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-white">
          <X className="w-6 h-6" />
        </button>

        {!isAuthenticated ? (
          <div className="max-w-sm mx-auto text-center py-12">
            <div className="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary mx-auto mb-6">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold mb-6">Yönetici Girişi</h2>
            <form onSubmit={handleAuth} className="space-y-4">
              <input 
                type="password" 
                placeholder="Şifre"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-hidden focus:border-brand-primary transition-colors text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="btn-primary w-full">Giriş Yap</button>
            </form>
          </div>
        ) : (
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold mb-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Plus className="w-6 h-6 text-brand-primary" />
                  {editingId ? 'Projeyi Düzenle' : 'Yeni Proje Ekle'}
                </div>
                {editingId ? (
                  <button 
                    onClick={() => {
                      setEditingId(null);
                      setFormData({
                        title: '',
                        description: '',
                        image: '',
                        tags: '',
                        github: '',
                        link: '',
                        isExternal: true
                      });
                    }}
                    className="text-xs text-slate-500 hover:text-white transition-colors underline decoration-dotted"
                  >
                    Vazgeç
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      setIsAuthenticated(false);
                      sessionStorage.removeItem('isAdminAuthenticated');
                    }}
                    className="text-xs text-red-500/50 hover:text-red-500 transition-colors"
                  >
                    Güvenli Çıkış
                  </button>
                )}
              </h2>
              <form onSubmit={handleAddProject} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1 flex items-center gap-2">
                    <Type className="w-3 h-3" /> Proje Adı
                  </label>
                  <input 
                    required
                    type="text" 
                    placeholder="Örn: Ölçeklenebilir API"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-hidden focus:border-brand-primary transition-colors text-sm"
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1 flex items-center gap-2">
                    <AlignLeft className="w-3 h-3" /> Açıklama
                  </label>
                  <textarea 
                    required
                    rows={3} 
                    placeholder="Proje detayları..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-hidden focus:border-brand-primary transition-colors text-sm resize-none"
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                  ></textarea>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1 flex items-center gap-2">
                    <ImageIcon className="w-3 h-3" /> Proje Görseli (Base64)
                  </label>
                  <div className="flex flex-col gap-4">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-white/5 file:text-white hover:file:bg-white/10"
                    />
                    {formData.image && (
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10">
                        <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                        <button 
                          type="button"
                          onClick={() => setFormData({...formData, image: ''})}
                          className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-black/80 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Etiketler (Virgülle ayırın)</label>
                  <input 
                    type="text" 
                    placeholder="Node.js, Docker, Redis"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-hidden focus:border-brand-primary transition-colors text-sm"
                    value={formData.tags}
                    onChange={e => setFormData({...formData, tags: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Birinci Link (Örn: Web Sitesi)</label>
                  <input 
                    type="text" 
                    placeholder="https://..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-hidden focus:border-brand-primary transition-colors text-sm"
                    value={formData.link}
                    onChange={e => setFormData({...formData, link: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">İkinci Link (Örn: Kaynak Kod/GitHub)</label>
                  <input 
                    type="text" 
                    placeholder="https://..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-hidden focus:border-brand-primary transition-colors text-sm"
                    value={formData.github}
                    onChange={e => setFormData({...formData, github: e.target.value})}
                  />
                </div>
                <div className="flex items-center gap-3 py-2 px-1">
                  <input 
                    type="checkbox" 
                    id="isExternal"
                    className="w-4 h-4 accent-brand-primary cursor-pointer"
                    checked={formData.isExternal}
                    onChange={e => setFormData({...formData, isExternal: e.target.checked})}
                  />
                  <label htmlFor="isExternal" className="text-[10px] uppercase tracking-widest text-slate-400 font-bold cursor-pointer">Kart Tıklandığında Birinci Linke Git</label>
                </div>
                <div className="flex items-end">
                  <button type="submit" disabled={loading} className="btn-primary w-full h-[46px] flex items-center justify-center gap-2">
                    {loading ? 'İşleniyor...' : (editingId ? 'Güncelle' : 'Kaydet')}
                  </button>
                </div>
              </form>
            </div>

            <div className="pt-8 border-t border-white/5">
              <h3 className="text-xl font-bold mb-6">Mevcut Projeler</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {existingProjects.map(proj => (
                  <div key={proj.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-4">
                      <img src={proj.image} className="w-12 h-12 rounded-lg object-cover" alt="" />
                      <div className="max-w-[120px]">
                        <h4 className="font-bold text-xs truncate">{proj.title}</h4>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => startEditing(proj)}
                        className="p-2 text-slate-500 hover:text-brand-primary transition-colors"
                        title="Düzenle"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button 
                        type="button"
                        onClick={(e) => handleDelete(e, proj)}
                        className="p-2 text-slate-500 hover:text-red-500 transition-colors cursor-pointer"
                        title="Sil"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
                {existingProjects.length === 0 && (
                  <p className="col-span-2 text-sm text-slate-500 text-center py-4 italic">Henüz proje eklenmedi.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
