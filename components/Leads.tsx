
import React, { useState, useMemo, useEffect } from 'react';
import { Lead, LeadStatus, Client, ClientStatus, Project, Package, AddOn, Transaction, TransactionType, ProjectStatus, PaymentStatus, Profile, Card, FinancialPocket, ContactChannel, PromoCode } from '../types';
import PageHeader from './PageHeader';
import Modal from './Modal';
import StatCard from './StatCard';
import { PlusIcon, UsersIcon, MessageSquareIcon, LightbulbIcon, TrendingUpIcon, TargetIcon, PencilIcon, Trash2Icon, Share2Icon } from '../constants';

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
}

const getStatusColorClass = (status: LeadStatus) => {
    switch(status) {
        case LeadStatus.NEW: return 'border-sky-500';
        case LeadStatus.DISCUSSION: return 'border-blue-500';
        case LeadStatus.FOLLOW_UP: return 'border-purple-500';
        case LeadStatus.CONVERTED: return 'border-green-500';
        case LeadStatus.REJECTED: return 'border-red-500';
        default: return 'border-gray-500';
    }
}

const initialConversionFormState = {
    phone: '',
    email: '',
    instagram: '',
    projectName: '',
    projectType: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    packageId: '',
    selectedAddOnIds: [] as string[],
    dp: 0,
    dpDestinationCardId: '',
    notes: '',
    promoCodeId: '',
};

const initialNewLeadFormState = {
    name: '',
    contactChannel: ContactChannel.OTHER,
    location: '',
    notes: ''
};

interface LeadsProps {
    leads: Lead[];
    setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
    clients: Client[];
    setClients: React.Dispatch<React.SetStateAction<Client[]>>;
    projects: Project[];
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
    packages: Package[];
    addOns: AddOn[];
    transactions: Transaction[];
    setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
    userProfile: Profile;
    showNotification: (message: string) => void;
    cards: Card[];
    setCards: React.Dispatch<React.SetStateAction<Card[]>>;
    pockets: FinancialPocket[];
    setPockets: React.Dispatch<React.SetStateAction<FinancialPocket[]>>;
    promoCodes: PromoCode[];
    setPromoCodes: React.Dispatch<React.SetStateAction<PromoCode[]>>;
}

const Leads: React.FC<LeadsProps> = ({
    leads, setLeads, clients, setClients, projects, setProjects, packages, addOns, transactions, setTransactions, userProfile, showNotification, cards, setCards, pockets, setPockets, promoCodes, setPromoCodes
}) => {
    const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);
    const [leadToConvert, setLeadToConvert] = useState<Lead | null>(null);
    const [conversionForm, setConversionForm] = useState(initialConversionFormState);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newLeadForm, setNewLeadForm] = useState(initialNewLeadFormState);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [isEditingLead, setIsEditingLead] = useState(false);
    const [editedLeadNotes, setEditedLeadNotes] = useState('');
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);


    const leadStats = useMemo(() => {
        const totalLeads = leads.length;
        const newLeads = leads.filter(l => l.status === LeadStatus.NEW).length;
        const convertedLeads = leads.filter(l => l.status === LeadStatus.CONVERTED).length;
        const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads * 100) : 0;

        return {
            totalLeads,
            newLeads,
            convertedLeads,
            conversionRate: conversionRate.toFixed(1) + '%'
        };
    }, [leads]);
    
    const strategicSuggestions = useMemo(() => {
        const suggestions: { id: string; icon: React.ReactNode; text: string; subtext: string; }[] = [];
        const leadsToFollowUp = leads.filter(l => l.status === LeadStatus.FOLLOW_UP).length;
        if (leadsToFollowUp > 0) {
             suggestions.push({
                id: 'followup',
                icon: <MessageSquareIcon className="w-5 h-5 text-blue-400" />,
                text: `Ada ${leadsToFollowUp} prospek menunggu follow-up`,
                subtext: 'Segera hubungi mereka untuk meningkatkan peluang konversi.'
            });
        }
        
        const rejectedLeads = leads.filter(l => l.status === LeadStatus.REJECTED).length;
        if (rejectedLeads > 2) {
            suggestions.push({
                id: 'analyze-rejection',
                icon: <LightbulbIcon className="w-5 h-5 text-yellow-400" />,
                text: 'Analisis Prospek yang Ditolak',
                subtext: 'Cari tahu alasan umum penolakan untuk perbaikan strategi.'
            });
        }
        
        return suggestions;
    }, [leads]);

    const bookingFormUrl = useMemo(() => {
        return `${window.location.origin}${window.location.pathname}#/public-booking`;
    }, []);

    useEffect(() => {
        if (isShareModalOpen) {
            const qrCodeContainer = document.getElementById('leads-booking-form-qrcode');
            if (qrCodeContainer && typeof (window as any).QRCode !== 'undefined') {
                qrCodeContainer.innerHTML = '';
                new (window as any).QRCode(qrCodeContainer, {
                    text: bookingFormUrl,
                    width: 200,
                    height: 200,
                    colorDark: "#020617",
                    colorLight: "#ffffff",
                    correctLevel: 2 // H
                });
            }
        }
    }, [isShareModalOpen, bookingFormUrl]);

    const copyBookingLinkToClipboard = () => {
        navigator.clipboard.writeText(bookingFormUrl).then(() => {
            showNotification('Tautan formulir booking berhasil disalin!');
            setIsShareModalOpen(false);
        });
    };
    
    const downloadQrCode = () => {
        const canvas = document.querySelector('#leads-booking-form-qrcode canvas') as HTMLCanvasElement;
        if (canvas) {
            const link = document.createElement('a');
            link.download = 'form-booking-qr.png';
            link.href = canvas.toDataURL();
            link.click();
        }
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, leadId: string) => {
        e.dataTransfer.setData("leadId", leadId);
        setDraggedLeadId(leadId);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, newStatus: LeadStatus) => {
        e.preventDefault();
        const leadId = e.dataTransfer.getData("leadId");
        const lead = leads.find(l => l.id === leadId);

        if (lead && lead.status !== newStatus) {
            if (newStatus === LeadStatus.CONVERTED) {
                setLeadToConvert(lead);
                setConversionForm(prev => ({...prev, projectName: `Proyek ${lead.name}`, location: lead.location, projectType: userProfile.projectTypes[0]}));
            } else {
                setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
            }
        }
        setDraggedLeadId(null);
    };
    
    const handleConversionFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const { id, checked } = e.target as HTMLInputElement;
            setConversionForm(prev => ({ ...prev, selectedAddOnIds: checked ? [...prev.selectedAddOnIds, id] : prev.selectedAddOnIds.filter(addOnId => addOnId !== id) }));
        } else {
            setConversionForm(prev => ({ ...prev, [name]: (name === 'dp') ? Number(value) : value }));
        }
    };
    
    const handleConvertLead = (e: React.FormEvent) => {
        e.preventDefault();
        if (!leadToConvert) return;
        
        const selectedPackage = packages.find(p => p.id === conversionForm.packageId);
        if (!selectedPackage) { alert("Harap pilih paket layanan."); return; }
        
        const selectedAddOns = addOns.filter(addon => conversionForm.selectedAddOnIds.includes(addon.id));
        const totalBeforeDiscount = selectedPackage.price + selectedAddOns.reduce((sum, addon) => sum + addon.price, 0);
        
        let finalDiscountAmount = 0;
        const promoCode = promoCodes.find(p => p.id === conversionForm.promoCodeId);
        if (promoCode) {
            if (promoCode.discountType === 'percentage') {
                finalDiscountAmount = (totalBeforeDiscount * promoCode.discountValue) / 100;
            } else {
                finalDiscountAmount = promoCode.discountValue;
            }
        }
        const totalProject = totalBeforeDiscount - finalDiscountAmount;
        const remainingPayment = totalProject - conversionForm.dp;

        const newClientId = `CLI${Date.now()}`;
        const newClient: Client = {
            id: newClientId, name: leadToConvert.name, email: conversionForm.email, phone: conversionForm.phone,
            instagram: conversionForm.instagram, since: new Date().toISOString().split('T')[0], status: ClientStatus.ACTIVE,
            lastContact: new Date().toISOString(),
            portalAccessId: crypto.randomUUID(),
        };

        const newProject: Project = {
            id: `PRJ${Date.now()}`, projectName: conversionForm.projectName, clientName: newClient.name, clientId: newClient.id,
            projectType: conversionForm.projectType, packageName: selectedPackage.name, packageId: selectedPackage.id,
            addOns: selectedAddOns, date: conversionForm.date, location: conversionForm.location, progress: 0,
            status: ProjectStatus.CONFIRMED, totalCost: totalProject, amountPaid: conversionForm.dp,
            paymentStatus: conversionForm.dp > 0 ? (remainingPayment <= 0 ? PaymentStatus.LUNAS : PaymentStatus.DP_TERBAYAR) : PaymentStatus.BELUM_BAYAR,
            team: [], notes: conversionForm.notes,
            promoCodeId: conversionForm.promoCodeId || undefined,
            discountAmount: finalDiscountAmount > 0 ? finalDiscountAmount : undefined,
        };

        setClients(prev => [newClient, ...prev]);
        setProjects(prev => [newProject, ...prev]);
        setLeads(prev => prev.map(l => l.id === leadToConvert.id ? { ...l, status: LeadStatus.CONVERTED } : l));

        if (newProject.amountPaid > 0) {
            const newTransaction: Transaction = {
                id: `TRN-DP-${newProject.id}`, date: new Date().toISOString().split('T')[0], description: `DP Proyek ${newProject.projectName}`,
                amount: newProject.amountPaid, type: TransactionType.INCOME, projectId: newProject.id, category: 'DP Proyek',
                method: 'Transfer Bank', pocketId: 'POC005', cardId: conversionForm.dpDestinationCardId,
            };
            setTransactions(prev => [...prev, newTransaction].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
            setCards(prev => prev.map(c => c.id === conversionForm.dpDestinationCardId ? { ...c, balance: c.balance + newProject.amountPaid } : c));
            setPockets(prev => prev.map(p => p.id === 'POC005' ? { ...p, amount: p.amount + newProject.amountPaid } : p));
        }

        if (promoCode) {
            setPromoCodes(prev => prev.map(p => p.id === promoCode.id ? { ...p, usageCount: p.usageCount + 1 } : p));
        }
        
        showNotification(`Prospek berhasil dikonversi menjadi klien baru.`);
        setLeadToConvert(null);
        setConversionForm(initialConversionFormState);
    };
    
    const handleNewLeadFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewLeadForm(prev => ({ ...prev, [name]: value }));
    };

    const handleAddLeadSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newLead: Lead = {
            id: `LEAD-MANUAL-${Date.now()}`,
            name: newLeadForm.name,
            contactChannel: newLeadForm.contactChannel,
            location: newLeadForm.location,
            status: LeadStatus.NEW,
            date: new Date().toISOString().split('T')[0],
            notes: newLeadForm.notes,
        };
        setLeads(prev => [newLead, ...prev]);
        setIsAddModalOpen(false);
        setNewLeadForm(initialNewLeadFormState);
        showNotification(`Prospek baru "${newLead.name}" berhasil ditambahkan.`);
    };

    const handleOpenLeadDetail = (lead: Lead) => {
        setSelectedLead(lead);
        setEditedLeadNotes(lead.notes || '');
        setIsDetailModalOpen(true);
        setIsEditingLead(false);
    };
    
    const handleCloseLeadDetail = () => {
        setIsDetailModalOpen(false);
        setSelectedLead(null);
    };
    
    const handleUpdateLead = () => {
        if (!selectedLead) return;
        const updatedLead = { ...selectedLead, notes: editedLeadNotes };
        setLeads(prev => prev.map(l => l.id === updatedLead.id ? updatedLead : l));
        showNotification("Prospek berhasil diperbarui.");
        setIsEditingLead(false);
        setSelectedLead(updatedLead);
    };
    
    const handleDeleteLead = (leadId: string) => {
        if (window.confirm("Yakin ingin menghapus prospek ini?")) {
            setLeads(prev => prev.filter(l => l.id !== leadId));
            handleCloseLeadDetail();
            showNotification("Prospek berhasil dihapus.");
        }
    };
    
    const handleTriggerConversion = () => {
        if (!selectedLead) return;
        setLeadToConvert(selectedLead);
        setConversionForm(prev => ({ ...prev, projectName: `Proyek ${selectedLead.name}`, location: selectedLead.location }));
        handleCloseLeadDetail();
    };

    return (
        <div className="space-y-6">
            <PageHeader title="Manajemen Prospek" subtitle="Lacak dan kelola semua prospek potensial Anda dalam satu papan.">
                 <div className="flex items-center gap-2">
                    <button onClick={() => setIsShareModalOpen(true)} className="button-secondary inline-flex items-center gap-2">
                        <Share2Icon className="w-4 h-4" /> Bagikan Form Booking
                    </button>
                    <button onClick={() => setIsAddModalOpen(true)} className="button-primary inline-flex items-center gap-2"><PlusIcon className="w-5 h-5" /> Tambah Manual</button>
                </div>
            </PageHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="widget-animate" style={{ animationDelay: '100ms' }}>
                    <StatCard icon={<UsersIcon className="w-6 h-6"/>} title="Total Prospek" value={leadStats.totalLeads.toString()} />
                </div>
                 <div className="widget-animate" style={{ animationDelay: '200ms' }}>
                    <StatCard icon={<LightbulbIcon className="w-6 h-6"/>} title="Prospek Baru" value={leadStats.newLeads.toString()} />
                </div>
                 <div className="widget-animate" style={{ animationDelay: '300ms' }}>
                    <StatCard icon={<TrendingUpIcon className="w-6 h-6"/>} title="Prospek Dikonversi" value={leadStats.convertedLeads.toString()} />
                </div>
                 <div className="widget-animate" style={{ animationDelay: '400ms' }}>
                    <StatCard icon={<TargetIcon className="w-6 h-6"/>} title="Tingkat Konversi" value={leadStats.conversionRate} />
                </div>
            </div>
            
            <div className="flex gap-6 overflow-x-auto pb-4 -mx-6 px-6 widget-animate" style={{ animationDelay: '500ms' }}>
                {Object.values(LeadStatus).map((status, index) => (
                    <div 
                        key={status} 
                        className="w-80 flex-shrink-0 bg-brand-bg rounded-2xl border border-brand-border"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, status)}
                    >
                        <div className={`p-4 font-semibold text-brand-text-light border-b-2 ${getStatusColorClass(status)} flex justify-between items-center sticky top-0 bg-brand-bg/80 backdrop-blur-sm rounded-t-2xl z-10`}>
                            <span>{status}</span>
                            <span className="text-sm font-normal bg-brand-surface text-brand-text-secondary px-2.5 py-1 rounded-full">{leads.filter(l => l.status === status).length}</span>
                        </div>
                        <div className="p-3 space-y-3 h-[calc(100vh-420px)] overflow-y-auto">
                            {leads.filter(l => l.status === status).map((lead) => (
                                <div
                                    key={lead.id}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, lead.id)}
                                    onClick={() => handleOpenLeadDetail(lead)}
                                    className={`p-4 bg-brand-surface rounded-xl cursor-pointer hover:shadow-xl transition-shadow border-l-4 shadow-lg ${draggedLeadId === lead.id ? 'opacity-50 ring-2 ring-brand-accent' : 'opacity-100'}`}
                                    style={{ borderLeftColor: getStatusColorClass(lead.status).replace('border-','') }}
                                >
                                    <p className="font-semibold text-sm text-brand-text-light">{lead.name}</p>
                                    <p className="text-xs text-brand-text-secondary mt-1">{lead.contactChannel}</p>
                                    {lead.notes && (
                                        <p className="text-xs text-brand-text-primary mt-2 pt-2 border-t border-brand-border italic truncate">
                                            "{lead.notes}"
                                        </p>
                                    )}
                                    <div className="flex justify-between items-center mt-3 text-xs">
                                        <span className="text-brand-text-secondary">{lead.location}</span>
                                        <span className="text-brand-text-secondary">{new Date(lead.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'short'})}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

             {isAddModalOpen && (
                <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Tambah Prospek Manual">
                    <form onSubmit={handleAddLeadSubmit} className="space-y-4">
                        <div className="input-group">
                            <input type="text" id="newLeadName" name="name" value={newLeadForm.name} onChange={handleNewLeadFormChange} className="input-field" placeholder=" " required />
                            <label htmlFor="newLeadName" className="input-label">Nama Prospek</label>
                        </div>
                        <div className="input-group">
                            <select id="newLeadContactChannel" name="contactChannel" value={newLeadForm.contactChannel} onChange={handleNewLeadFormChange} className="input-field" required>
                                {Object.values(ContactChannel)
                                    .filter(c => c !== ContactChannel.SUGGESTION_FORM)
                                    .map(channel => (
                                        <option key={channel} value={channel}>{channel}</option>
                                    ))
                                }
                            </select>
                            <label htmlFor="newLeadContactChannel" className="input-label">Sumber Prospek</label>
                        </div>
                        <div className="input-group">
                            <input type="text" id="newLeadLocation" name="location" value={newLeadForm.location} onChange={handleNewLeadFormChange} className="input-field" placeholder=" " required />
                            <label htmlFor="newLeadLocation" className="input-label">Lokasi (e.g., Kota)</label>
                        </div>
                        <div className="input-group">
                            <textarea id="newLeadNotes" name="notes" value={newLeadForm.notes} onChange={handleNewLeadFormChange} className="input-field" placeholder=" " rows={3}></textarea>
                            <label htmlFor="newLeadNotes" className="input-label">Catatan (Kontak, dll.)</label>
                        </div>
                        <div className="flex justify-end items-center gap-3 pt-6 border-t border-brand-border">
                            <button type="button" onClick={() => setIsAddModalOpen(false)} className="button-secondary">Batal</button>
                            <button type="submit" className="button-primary">Simpan Prospek</button>
                        </div>
                    </form>
                </Modal>
            )}

            {isDetailModalOpen && selectedLead && (
                <Modal isOpen={isDetailModalOpen} onClose={handleCloseLeadDetail} title={`Detail Prospek: ${selectedLead.name}`}>
                    {isEditingLead ? (
                        <div className="space-y-4">
                            <div className="input-group">
                                <textarea 
                                    id="leadNotes" 
                                    rows={5} 
                                    value={editedLeadNotes} 
                                    onChange={(e) => setEditedLeadNotes(e.target.value)} 
                                    className="input-field"
                                    placeholder=" "
                                />
                                <label htmlFor="leadNotes" className="input-label">Catatan Prospek</label>
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t border-brand-border">
                                <button type="button" onClick={() => setIsEditingLead(false)} className="button-secondary">Batal</button>
                                <button type="button" onClick={handleUpdateLead} className="button-primary">Simpan Catatan</button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <p><strong>Nama:</strong> {selectedLead.name}</p>
                            <p><strong>Sumber Kontak:</strong> {selectedLead.contactChannel}</p>
                            <p><strong>Lokasi:</strong> {selectedLead.location}</p>
                            <p><strong>Tanggal Kontak:</strong> {new Date(selectedLead.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                            <div>
                                <strong>Catatan:</strong>
                                <div className="mt-1 p-3 bg-brand-bg rounded-md text-sm text-brand-text-primary whitespace-pre-wrap">
                                    {selectedLead.notes || 'Tidak ada catatan.'}
                                </div>
                            </div>
                            <div className="flex justify-between items-center pt-6 border-t border-brand-border">
                                <div>
                                    <button type="button" onClick={() => setIsEditingLead(true)} className="button-secondary inline-flex items-center gap-2"><PencilIcon className="w-4 h-4" /> Edit</button>
                                    <button type="button" onClick={() => handleDeleteLead(selectedLead.id)} className="button-secondary !text-brand-danger ml-2 inline-flex items-center gap-2"><Trash2Icon className="w-4 h-4" /> Hapus</button>
                                </div>
                                {selectedLead.status !== LeadStatus.CONVERTED && selectedLead.status !== LeadStatus.REJECTED && (
                                    <button type="button" onClick={handleTriggerConversion} className="button-primary">Konversi menjadi Klien</button>
                                )}
                            </div>
                        </div>
                    )}
                </Modal>
            )}

            {leadToConvert && (
                <Modal isOpen={!!leadToConvert} onClose={() => setLeadToConvert(null)} title={`Konversi Prospek: ${leadToConvert.name}`} size="3xl">
                    <form onSubmit={handleConvertLead}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                            {/* Left Column */}
                            <div className="space-y-4">
                                <h4 className="text-base font-semibold text-gradient border-b border-brand-border pb-2">Detail Kontak & Proyek</h4>
                                <div className="input-group"><input type="tel" id="phone" name="phone" value={conversionForm.phone} onChange={handleConversionFormChange} className="input-field" placeholder=" " required/><label htmlFor="phone" className="input-label">Nomor Telepon</label></div>
                                <div className="input-group"><input type="email" id="email" name="email" value={conversionForm.email} onChange={handleConversionFormChange} className="input-field" placeholder=" " required/><label htmlFor="email" className="input-label">Email</label></div>
                                <div className="input-group"><input type="text" id="projectName" name="projectName" value={conversionForm.projectName} onChange={handleConversionFormChange} className="input-field" placeholder=" " required/><label htmlFor="projectName" className="input-label">Nama Proyek</label></div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="input-group"><select id="projectType" name="projectType" value={conversionForm.projectType} onChange={handleConversionFormChange} className="input-field" required><option value="" disabled>Pilih Jenis...</option>{userProfile.projectTypes.map(pt => <option key={pt} value={pt}>{pt}</option>)}</select><label htmlFor="projectType" className="input-label">Jenis Proyek</label></div>
                                    <div className="input-group"><input type="date" id="date" name="date" value={conversionForm.date} onChange={handleConversionFormChange} className="input-field" placeholder=" "/><label htmlFor="date" className="input-label">Tanggal Acara</label></div>
                                </div>
                                <div className="input-group"><input type="text" id="location" name="location" value={conversionForm.location} onChange={handleConversionFormChange} className="input-field" placeholder=" "/><label htmlFor="location" className="input-label">Lokasi</label></div>
                            </div>
                            {/* Right Column */}
                             <div className="space-y-4">
                                <h4 className="text-base font-semibold text-gradient border-b border-brand-border pb-2">Paket & Pembayaran</h4>
                                <div className="input-group"><select id="packageId" name="packageId" value={conversionForm.packageId} onChange={handleConversionFormChange} className="input-field" required><option value="">Pilih paket...</option>{packages.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select><label htmlFor="packageId" className="input-label">Paket</label></div>
                                <div className="input-group"><label className="input-label !static !-top-4 !text-brand-accent">Add-On</label><div className="p-2 border border-brand-border bg-brand-bg rounded-lg max-h-24 overflow-y-auto space-y-1 mt-2">{addOns.map(addon => (<label key={addon.id} className="flex items-center justify-between p-1 rounded-md hover:bg-brand-input cursor-pointer"><span className="text-sm">{addon.name}</span><input type="checkbox" id={addon.id} name="addOns" checked={conversionForm.selectedAddOnIds.includes(addon.id)} onChange={handleConversionFormChange} /></label>))}</div></div>
                                <div className="input-group"><select id="promoCodeId" name="promoCodeId" value={conversionForm.promoCodeId} onChange={handleConversionFormChange} className="input-field"><option value="">Tanpa Kode Promo</option>{promoCodes.filter(p => p.isActive).map(p => (<option key={p.id} value={p.id}>{p.code} - ({p.discountType === 'percentage' ? `${p.discountValue}%` : formatCurrency(p.discountValue)})</option>))}</select><label htmlFor="promoCodeId" className="input-label">Kode Promo</label></div>
                                <div className="input-group"><input type="number" name="dp" id="dp" value={conversionForm.dp} onChange={handleConversionFormChange} className="input-field" placeholder=" "/><label htmlFor="dp" className="input-label">Uang DP</label></div>
                                {conversionForm.dp > 0 && (<div className="input-group"><select name="dpDestinationCardId" value={conversionForm.dpDestinationCardId} onChange={handleConversionFormChange} className="input-field" required><option value="">Setor DP ke...</option>{cards.map(c => <option key={c.id} value={c.id}>{c.bankName} **** {c.lastFourDigits}</option>)}</select><label htmlFor="dpDestinationCardId" className="input-label">Kartu Tujuan</label></div>)}
                            </div>
                        </div>
                        <div className="flex justify-end items-center gap-3 pt-6 mt-6 border-t border-brand-border">
                            <button type="button" onClick={() => setLeadToConvert(null)} className="button-secondary">Batal</button>
                            <button type="submit" className="button-primary">Konversi menjadi Klien</button>
                        </div>
                    </form>
                </Modal>
            )}
            
            {isShareModalOpen && (
                <Modal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} title="Bagikan Formulir Booking Publik" size="sm">
                    <div className="text-center p-4">
                        <div id="leads-booking-form-qrcode" className="p-4 bg-white rounded-lg inline-block mx-auto"></div>
                        <p className="text-xs text-brand-text-secondary mt-4 break-all">{bookingFormUrl}</p>
                        <div className="flex items-center gap-2 mt-6">
                            <button onClick={copyBookingLinkToClipboard} className="button-secondary w-full">Salin Tautan</button>
                            <button onClick={downloadQrCode} className="button-primary w-full">Unduh QR</button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Leads;
