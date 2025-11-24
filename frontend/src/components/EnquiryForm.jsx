import React, {useState} from 'react';
import { createEnquiry } from '../api/core';

export default function EnquiryForm({onSuccess}){
  const [form, setForm] = useState({name:'', phone:'', city:''});
  const [status, setStatus] = useState('');

  function setField(e){ setForm({...form, [e.target.name]: e.target.value}); }

  async function submit(e){
    e.preventDefault();
    setStatus('sending');
    try{
      await createEnquiry(form);
      setStatus('sent');
      setForm({name:'', phone:'', city:''});
      if(onSuccess) onSuccess();
    }catch(err){
      setStatus('error');
      console.error(err);
    }
  }

  return (
    <form onSubmit={submit} className="grid">
      <input className="input" name="name" placeholder="Name" value={form.name} onChange={setField} required />
      <input className="input" name="phone" placeholder="Phone" value={form.phone} onChange={setField} required />
      <input className="input" name="city" placeholder="City" value={form.city} onChange={setField} />
      <div style={{display:'flex',gap:8}}>
        <button className="button" type="submit">Send</button>
        {status && <div className="small">Status: {status}</div>}
      </div>
    </form>
  );
}
