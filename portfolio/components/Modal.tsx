'use client';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export function Modal({ isOpen, onClose, title, url }: { isOpen:boolean; onClose:()=>void; title?:string; url?:string }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if(e.key==='Escape') onClose(); };
    if(isOpen) { window.addEventListener('keydown',h); document.body.style.overflow='hidden'; }
    return () => { window.removeEventListener('keydown',h); document.body.style.overflow=''; };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          style={{ position:'fixed', inset:0, zIndex:300, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}
          initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
          transition={{ duration:.26 }}
          onClick={onClose}
        >
          <motion.div
            className="glass"
            style={{ width:'100%', maxWidth:820, display:'flex', flexDirection:'column', height:'min(78vh,600px)' }}
            initial={{ scale:.96, y:10 }} animate={{ scale:1, y:0 }} exit={{ scale:.96, y:10 }}
            transition={{ duration:.32, ease:[0.32,0.72,0,1] }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 20px', borderBottom:'1px solid rgba(255,255,255,0.055)' }}>
              <span style={{ fontSize:'.76rem', fontWeight:300, color:'rgba(188,210,232,0.38)' }}>{title}</span>
              <button onClick={onClose} style={{ width:26, height:26, borderRadius:7, border:'none', background:'none', color:'rgba(188,210,232,0.25)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'background .18s,color .18s', fontSize:'.85rem' }}><X size={13}/></button>
            </div>
            <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'0 0 26px 26px' }}>
              {url ? <iframe src={url} style={{ width:'100%', height:'100%', border:0 }} title={title} /> :
                <p style={{ fontSize:'.63rem', fontWeight:400, letterSpacing:'.14em', textTransform:'uppercase', color:'rgba(88,118,155,0.45)' }}>Preview · {title}</p>}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
