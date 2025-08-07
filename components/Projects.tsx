
import React, { useState, useMemo, useEffect } from 'react';
import { Project, ProjectStatus, PaymentStatus, TeamMember, Client, Package, TeamProjectPayment, Transaction, TransactionType, AssignedTeamMember, Profile, Revision, RevisionStatus, NavigationAction } from '../types';
import PageHeader from './PageHeader';
import Modal from './Modal';
import StatCard from './StatCard';
import { EyeIcon, PlusIcon, PencilIcon, Trash2Icon, ListIcon, LayoutGridIcon, getProjectStatusColor, FolderKanbanIcon, AlertCircleIcon, CalendarIcon, CheckSquareIcon, Share2Icon, ClockIcon, UsersIcon, ArrowDownIcon, ArrowUpIcon, FileTextIcon, SendIcon } from '../constants';

const getStatusClass = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.COMPLETED: return 'bg-brand-success/20 text-brand-success';
      case ProjectStatus.CONFIRMED: return 'bg-blue-500/20 text-blue-400';
      case ProjectStatus.EDITING: return 'bg-purple-500/20 text-purple-400';
      case ProjectStatus.PRINTING: return 'bg-orange-500/20 text-orange-400';
      case ProjectStatus.SHIPPED: return 'bg-teal-500/20 text-teal-400';
      case ProjectStatus.PENDING: return 'bg-yellow-500/20 text-yellow-400';
      case ProjectStatus.PREPARATION: return 'bg-gray-500/20 text-gray-300';
      case ProjectStatus.CANCELLED: return 'bg-brand-danger/20 text-brand-danger';
      default: return 'bg-gray-500/20 text-gray-400';
    }
};

const getPaymentStatusClass = (status: PaymentStatus) => {
    switch (status) {
        case PaymentStatus.LUNAS: return 'bg-brand-success/20 text-brand-success';
        case PaymentStatus.DP_TERBAYAR: return 'bg-blue-500/20 text-blue-400';
        case PaymentStatus.BELUM_BAYAR: return 'bg-yellow-500/20 text-yellow-400';
        default: return 'bg-gray-500/20 text-gray-400';
    }
};

const getRevisionStatusClass = (status: RevisionStatus) => {
    switch (status) {
        case RevisionStatus.COMPLETED: return 'bg-green-500/20 text-green-400';
        case RevisionStatus.IN_PROGRESS: return 'bg-blue-500/20 text-blue-400';
        case RevisionStatus.PENDING: return 'bg-yellow-500/20 text-yellow-400';
        default: return 'bg-gray-500/20 text-gray-400';
    }
};

const ProgressBar: React.FC<{ progress: number, status: ProjectStatus }> = ({ progress, status }) => (
    <div className="w-full bg-gray-700 rounded-full h-1.5">
        <div className="h-1.5 rounded-full transition-all duration-300" style={{ width: `${progress}%`, backgroundColor: getProjectStatusColor(status) }}></div>
    </div>
);

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
}

const initialFormState: Omit<Project, 'addOns' | 'paymentStatus' | 'amountPaid' | 'totalCost' | 'progress' | 'packageId' | 'dpProofUrl'> = {
    id: '',
    clientId: '',
    projectName: '',
    clientName: '',
    projectType: '',
    packageName: '',
    status: ProjectStatus.PREPARATION,
    subStatus: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    deadlineDate: '',
    team: [],
    notes: '',
    driveLink: '',
    clientDriveLink: '',
    finalDriveLink: '',
    startTime: '',
    endTime: '',
    shippingDetails: '',
};

interface ProjectListViewProps {
    projects: Project[];
    handleOpenDetailModal: (project: Project) => void;
    handleOpenForm: (mode: 'edit', project: Project) => void;
    handleProjectDelete: (projectId: string) => void;
}

const ProjectListView: React.FC<ProjectListViewProps> = ({ projects, handleOpenDetailModal, handleOpenForm, handleProjectDelete }) => (
    <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
            <thead className="text-xs text-brand-text-secondary uppercase">
                <tr>
                    <th className="px-6 py-4 font-medium tracking-wider">Nama Proyek</th>
                    <th className="px-6 py-4 font-medium tracking-wider">Klien</th>
                    <th className="px-6 py-4 font-medium tracking-wider">Tanggal</th>
                    <th className="px-6 py-4 font-medium tracking-wider min-w-[200px]">Progress</th>
                    <th className="px-6 py-4 font-medium tracking-wider">Tim</th>
                    <th className="px-6 py-4 font-medium tracking-wider text-center">Aksi</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
                {projects.map(p => (
                    <tr key={p.id} className="hover:bg-brand-bg transition-colors">
                        <td className="px-6 py-4">
                            <p className="font-semibold text-brand-text-light">{p.projectName}</p>
                            <p className={`text-xs font-medium px-2 py-0.5 rounded-full inline-block mt-1 ${getStatusClass(p.status)}`}>
                                {p.subStatus ? `${p.status}: ${p.subStatus}` : p.status}
                            </p>
                        </td>
                        <td className="px-6 py-4 text-brand-text-primary">{p.clientName}</td>
                        <td className="px-6 py-4 text-brand-text-primary">{new Date(p.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                                <ProgressBar progress={p.progress} status={p.status} />
                                <span className="text-xs font-semibold text-brand-text-secondary">{p.progress}%</span>
                            </div>
                        </td>
                        <td className="px-6 py-4 text-brand-text-primary">{p.team.map(t => t.name.split(' ')[0]).join(', ') || '-'}</td>
                        <td className="px-6 py-4">
                            <div className="flex items-center justify-center space-x-1">
                                <button onClick={() => handleOpenDetailModal(p)} className="p-2 text-brand-text-secondary hover:bg-gray-700/50 rounded-full" title="Detail Proyek"><EyeIcon className="w-5 h-5"/></button>
                                <button onClick={() => handleOpenForm('edit', p)} className="p-2 text-brand-text-secondary hover:bg-gray-700/50 rounded-full" title="Edit Proyek"><PencilIcon className="w-5 h-5"/></button>
                                <button onClick={() => handleProjectDelete(p.id)} className="p-2 text-brand-text-secondary hover:bg-gray-700/50 rounded-full" title="Hapus Proyek"><Trash2Icon className="w-5 h-5"/></button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {projects.length === 0 && <p className="text-center py-8 text-sm text-brand-text-secondary">Tidak ada proyek dalam kategori ini.</p>}
    </div>
);

interface ProjectKanbanViewProps {
    projects: Project[];
    handleOpenDetailModal: (project: Project) => void;
    draggedProjectId: string | null;
    handleDragStart: (e: React.DragEvent<HTMLDivElement>, projectId: string) => void;
    handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    handleDrop: (e: React.DragEvent<HTMLDivElement>, newStatus: ProjectStatus) => void;
}

const ProjectKanbanView: React.FC<ProjectKanbanViewProps> = ({ projects, handleOpenDetailModal, draggedProjectId, handleDragStart, handleDragOver, handleDrop }) => (
    <div className="flex gap-6 overflow-x-auto pb-4">
        {Object.values(ProjectStatus)
            .filter(status => status !== ProjectStatus.CANCELLED)
            .map(status => (
                <div 
                    key={status} 
                    className="w-80 flex-shrink-0 bg-brand-bg rounded-2xl border border-brand-border"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, status)}
                >
                    <div className="p-4 font-semibold text-brand-text-light border-b border-gray-700 flex justify-between items-center sticky top-0 bg-brand-bg/80 backdrop-blur-sm rounded-t-2xl z-10">
                        <span>{status}</span>
                        <span className="text-sm font-normal bg-brand-surface text-brand-text-secondary px-2.5 py-1 rounded-full">{projects.filter(p => p.status === status).length}</span>
                    </div>
                    <div className="p-3 space-y-3 h-[calc(100vh-420px)] overflow-y-auto">
                        {projects
                            .filter(p => p.status === status)
                            .map(p => (
                                <div
                                    key={p.id}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, p.id)}
                                    onClick={() => handleOpenDetailModal(p)}
                                    className={`p-4 bg-brand-surface rounded-xl cursor-grab border-l-4 shadow-lg ${draggedProjectId === p.id ? 'opacity-50 ring-2 ring-brand-accent' : 'opacity-100'}`}
                                    style={{ borderLeftColor: getProjectStatusColor(p.status) }}
                                >
                                    <p className="font-semibold text-sm text-brand-text-light">{p.projectName}</p>
                                    <p className="text-xs text-brand-text-secondary mt-1">{p.clientName}</p>
                                    <p className="text-xs font-bold text-brand-text-primary mt-1">{p.subStatus || ''}</p>
                                    <ProgressBar progress={p.progress} status={p.status} />
                                    <div className="flex justify-between items-center mt-3 text-xs">
                                        <span className="text-brand-text-secondary">{new Date(p.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'short'})}</span>
                                        <span className={`px-2 py-0.5 rounded-full ${getPaymentStatusClass(p.paymentStatus)}`}>
                                            {p.paymentStatus}
                                        </span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            ))
        }
    </div>
);


interface ProjectsProps {
    projects: Project[];
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
    clients: Client[];
    packages: Package[];
    teamMembers: TeamMember[];
    teamProjectPayments: TeamProjectPayment[];
    setTeamProjectPayments: React.Dispatch<React.SetStateAction<TeamProjectPayment[]>>;
    transactions: Transaction[];
    setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
    initialAction: NavigationAction | null;
    setInitialAction: (action: NavigationAction | null) => void;
    profile: Profile;
    showNotification: (message: string) => void;
}

const Projects: React.FC<ProjectsProps> = ({ projects, setProjects, clients, packages, teamMembers, teamProjectPayments, setTeamProjectPayments, transactions, setTransactions, initialAction, setInitialAction, profile, showNotification }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
    const [formData, setFormData] = useState<Omit<Project, 'addOns' | 'paymentStatus' | 'amountPaid' | 'totalCost' | 'progress' | 'packageId' | 'dpProofUrl'>>(initialFormState);

    const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
    const [draggedProjectId, setDraggedProjectId] = useState<string | null>(null);
    
    const [isBriefingModalOpen, setIsBriefingModalOpen] = useState(false);
    const [briefingText, setBriefingText] = useState('');
    const [whatsappLink, setWhatsappLink] = useState('');
    const [googleCalendarLink, setGoogleCalendarLink] = useState('');
    const [icsDataUri, setIcsDataUri] = useState('');
    
    // State for detail modal tabs and revision form
    const [detailTab, setDetailTab] = useState<'details' | 'revisions' | 'files'>('details');
    const [newRevision, setNewRevision] = useState({ adminNotes: '', deadline: '', freelancerId: '' });
    const [activeStatModal, setActiveStatModal] = useState<'total' | 'completed' | 'deadline' | 'unpaid' | null>(null);

    // State for collapsible project lists
    const [activeSectionOpen, setActiveSectionOpen] = useState(true);
    const [completedSectionOpen, setCompletedSectionOpen] = useState(false);


    const handleOpenDetailModal = (project: Project) => {
        setSelectedProject(project);
        setDetailTab('details'); // Reset to default tab
        setIsDetailModalOpen(true);
    };

    useEffect(() => {
        if (initialAction && initialAction.type === 'VIEW_PROJECT_DETAILS' && initialAction.id) {
            const projectToView = projects.find(p => p.id === initialAction.id);
            if (projectToView) {
                handleOpenDetailModal(projectToView);
            }
            setInitialAction(null);
        }
    }, [initialAction, projects, setInitialAction]);

    const teamByRole = useMemo(() => {
        return teamMembers.reduce((acc, member) => {
            if (!acc[member.role]) {
                acc[member.role] = [];
            }
            acc[member.role].push(member);
            return acc;
        }, {} as Record<string, TeamMember[]>);
    }, [teamMembers]);

    const filteredProjects = useMemo(() => {
        return projects
            .filter(p => viewMode === 'kanban' || statusFilter === 'all' || p.status === statusFilter)
            .filter(p => p.projectName.toLowerCase().includes(searchTerm.toLowerCase()) || p.clientName.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [projects, searchTerm, statusFilter, viewMode]);
    
    const summary = useMemo(() => ({
        total: projects.length,
        completed: projects.filter(p => p.status === ProjectStatus.COMPLETED).length,
        deadlineSoon: projects.filter(p => p.status !== ProjectStatus.COMPLETED && p.deadlineDate && new Date(p.deadlineDate) > new Date() && new Date(p.deadlineDate).getTime() < new Date().getTime() + 14 * 24 * 60 * 60 * 1000).length,
        unpaid: projects.filter(p => p.paymentStatus !== PaymentStatus.LUNAS && p.status !== ProjectStatus.CANCELLED).length
    }), [projects]);
    
    const projectsCompleted = useMemo(() => projects.filter(p => p.status === ProjectStatus.COMPLETED), [projects]);
    const deadlineSoonProjects = useMemo(() => projects.filter(p => p.status !== ProjectStatus.COMPLETED && p.deadlineDate && new Date(p.deadlineDate) > new Date() && new Date(p.deadlineDate).getTime() < new Date().getTime() + 14 * 24 * 60 * 60 * 1000), [projects]);
    const unpaidProjects = useMemo(() => projects.filter(p => p.paymentStatus !== PaymentStatus.LUNAS && p.status !== ProjectStatus.CANCELLED), [projects]);


    const handleOpenForm = (mode: 'add' | 'edit', project?: Project) => {
        setFormMode(mode);
        if (mode === 'edit' && project) {
            const { addOns, paymentStatus, amountPaid, totalCost, progress, packageId, dpProofUrl, ...operationalData } = project;
            setFormData(operationalData);
        } else {
            setFormData({...initialFormState, projectType: profile.projectTypes[0] || ''});
        }
        setIsFormVisible(true);
    };

    const handleCloseForm = () => {
        setIsFormVisible(false);
        setFormData(initialFormState);
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newState = {...prev, [name]: value};
            // Reset sub-status if main status changes
            if (name === 'status' && value !== ProjectStatus.EDITING && value !== ProjectStatus.PRINTING) {
                newState.subStatus = '';
            }
            if (name === 'status' && value !== ProjectStatus.SHIPPED) {
                newState.shippingDetails = '';
            }
            return newState;
        });
    };

    const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const clientId = e.target.value;
        const client = clients.find(c => c.id === clientId);
        if (client) {
            setFormData(prev => ({
                ...prev,
                clientId: client.id,
                clientName: client.name,
                projectName: prev.projectName || `Acara ${client.name}`
            }));
        }
    };

    const handleTeamChange = (member: TeamMember) => {
        setFormData(prev => {
            const isSelected = prev.team.some(t => t.memberId === member.id);
            if (isSelected) {
                return {
                    ...prev,
                    team: prev.team.filter(t => t.memberId !== member.id)
                }
            } else {
                const newTeamMember: AssignedTeamMember = {
                    memberId: member.id,
                    name: member.name,
                    role: member.role,
                    fee: member.standardFee,
                    reward: 0,
                };
                return {
                    ...prev,
                    team: [...prev.team, newTeamMember]
                }
            }
        });
    };
    
    const handleTeamFeeChange = (memberId: string, newFee: number) => {
        setFormData(prev => ({
            ...prev,
            team: prev.team.map(t => t.memberId === memberId ? { ...t, fee: newFee } : t)
        }));
    };

    const handleTeamRewardChange = (memberId: string, newReward: number) => {
        setFormData(prev => ({
            ...prev,
            team: prev.team.map(t => t.memberId === memberId ? { ...t, reward: newReward } : t)
        }));
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        let projectData: Project;

        if (formMode === 'add') {
             projectData = {
                ...initialFormState,
                ...formData,
                id: `PRJ${Date.now()}`,
                progress: 0,
                totalCost: 0, // Will be set on client page
                amountPaid: 0,
                paymentStatus: PaymentStatus.BELUM_BAYAR,
                packageId: '',
                addOns: [],
            };
        } else { // edit mode
            const originalProject = projects.find(p => p.id === formData.id);
            if (!originalProject) return; 

             projectData = {
                ...originalProject, // Keep financial data
                ...formData, // Overwrite operational data
                team: formData.team
            };
        }
        
        // Create payment tracking for ALL team members
        const allTeamMembersOnProject = projectData.team;
        const otherProjectPayments = teamProjectPayments.filter(p => p.projectId !== projectData.id);
        const newProjectPaymentEntries: TeamProjectPayment[] = allTeamMembersOnProject.map(teamMember => ({
            id: `TPP-${projectData.id}-${teamMember.memberId}`,
            projectId: projectData.id,
            teamMemberName: teamMember.name,
            teamMemberId: teamMember.memberId,
            date: projectData.date,
            status: 'Unpaid',
            fee: teamMember.fee,
            reward: teamMember.reward || 0,
        }));
        setTeamProjectPayments([...otherProjectPayments, ...newProjectPaymentEntries]);

        if (formMode === 'add') {
            setProjects(prev => [projectData, ...prev].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
        } else {
            setProjects(prev => prev.map(p => p.id === projectData.id ? projectData : p).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
        }
        handleCloseForm();
    };

    const handleProjectDelete = (projectId: string) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus proyek ini? Semua data terkait (termasuk tugas tim dan transaksi) akan dihapus.")) {
            setProjects(prev => prev.filter(p => p.id !== projectId));
            setTeamProjectPayments(prev => prev.filter(fp => fp.projectId !== projectId));
            setTransactions(prev => prev.filter(t => t.projectId !== projectId));
        }
    };
    
    const handleOpenBriefingModal = (project: Project) => {
        setSelectedProject(project);
        const date = new Date(project.date).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    
        const teamList = project.team.length > 0
            ? project.team.map(t => `- ${t.name}`).join('\n')
            : 'Tim belum ditugaskan.';
    
        const parts = [];
        parts.push(`${date}`);
        parts.push(`*${project.projectName}*`);
        parts.push(`\n*Tim Bertugas:*\n${teamList}`);
        
        if (project.startTime || project.endTime || project.location) parts.push(''); 
    
        if (project.startTime) parts.push(`*Waktu Mulai:* ${project.startTime}`);
        if (project.endTime) parts.push(`*Waktu Selesai:* ${project.endTime}`);
        if (project.location) parts.push(`*Lokasi :* ${project.location}`);
        
        if (project.notes) {
            parts.push('');
            parts.push(`*Catatan:*\n${project.notes}`);
        }
    
        if (project.location || project.driveLink) parts.push('');
    
        if (project.location) {
            const mapsQuery = encodeURIComponent(project.location);
            const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
            parts.push(`*Link Lokasi:*\n${mapsLink}`);
        }
    
        if (project.driveLink) {
             if (project.location) parts.push('');
            parts.push(`*Link Moodboard:*\n${project.driveLink}`);
        }

        if (profile.briefingTemplate) {
            parts.push('\n---\n');
            parts.push(profile.briefingTemplate);
        }

        const text = parts.join('\n').replace(/\n\n\n+/g, '\n\n').trim();
    
        setBriefingText(text);
        setWhatsappLink(`whatsapp://send?text=${encodeURIComponent(text)}`);
        
        // --- Calendar Integration ---
        const toGoogleCalendarFormat = (date: Date) => date.toISOString().replace(/-|:|\.\d{3}/g, '');
        const timeRegex = /(\d{2}:\d{2})/;
        const startTimeMatch = project.startTime?.match(timeRegex);
        const endTimeMatch = project.endTime?.match(timeRegex);

        let googleLink = '';
        let icsContent = '';

        if (startTimeMatch) {
            const startDate = new Date(`${project.date}T${startTimeMatch[1]}:00`);
            const isInternalEvent = profile.eventTypes.includes(project.projectType);
            const durationHours = isInternalEvent ? 2 : 8;

            const endDate = endTimeMatch 
                ? new Date(`${project.date}T${endTimeMatch[1]}:00`)
                : new Date(startDate.getTime() + durationHours * 60 * 60 * 1000);

            const googleDates = `${toGoogleCalendarFormat(startDate)}/${toGoogleCalendarFormat(endDate)}`;
            
            const calendarDescription = `Briefing untuk ${project.projectName}:\n\n${text}`;

            googleLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(project.projectName)}&dates=${googleDates}&details=${encodeURIComponent(calendarDescription)}&location=${encodeURIComponent(project.location || '')}`;

            const icsDescription = calendarDescription.replace(/\n/g, '\\n');
            icsContent = [
                'BEGIN:VCALENDAR',
                'VERSION:2.0',
                'BEGIN:VEVENT',
                `UID:${project.id}@venapictures.com`,
                `DTSTAMP:${toGoogleCalendarFormat(new Date())}`,
                `DTSTART:${toGoogleCalendarFormat(startDate)}`,
                `DTEND:${toGoogleCalendarFormat(endDate)}`,
                `SUMMARY:${project.projectName}`,
                `DESCRIPTION:${icsDescription}`,
                `LOCATION:${project.location || ''}`,
                'END:VEVENT',
                'END:VCALENDAR'
            ].join('\n');
        }

        setGoogleCalendarLink(googleLink);
        setIcsDataUri(icsContent ? `data:text/calendar;charset=utf8,${encodeURIComponent(icsContent)}` : '');
    
        setIsBriefingModalOpen(true);
    };
    
    // --- Kanban Drag & Drop Handlers ---
    const getProgressForStatus = (status: ProjectStatus) => {
        switch (status) {
            case ProjectStatus.PREPARATION: return 10;
            case ProjectStatus.CONFIRMED: return 25;
            case ProjectStatus.EDITING: return 70;
            case ProjectStatus.PRINTING: return 90;
            case ProjectStatus.SHIPPED: return 95;
            case ProjectStatus.COMPLETED: return 100;
            case ProjectStatus.CANCELLED: return 0;
            case ProjectStatus.PENDING: return 0;
            default: return 0;
        }
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, projectId: string) => {
        e.dataTransfer.setData("projectId", projectId);
        setDraggedProjectId(projectId);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault(); // Necessary to allow dropping
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, newStatus: ProjectStatus) => {
        e.preventDefault();
        const projectId = e.dataTransfer.getData("projectId");
        const projectToUpdate = projects.find(p => p.id === projectId);

        if (projectToUpdate && projectToUpdate.status !== newStatus) {
            setProjects(prevProjects =>
                prevProjects.map(p =>
                    p.id === projectId ? { ...p, status: newStatus, progress: getProgressForStatus(newStatus), subStatus: '' } : p
                )
            );
            showNotification(`Status "${projectToUpdate.projectName}" diubah ke "${newStatus}"`);
        }
        setDraggedProjectId(null); // Clear visual feedback
    };
    
    // --- REVISION HANDLERS ---
    const handleAddRevision = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedProject || !newRevision.freelancerId || !newRevision.adminNotes || !newRevision.deadline) {
            showNotification('Harap lengkapi semua field revisi.');
            return;
        }

        const revisionToAdd: Revision = {
            id: `REV-${Date.now()}`,
            date: new Date().toISOString(),
            adminNotes: newRevision.adminNotes,
            deadline: newRevision.deadline,
            freelancerId: newRevision.freelancerId,
            status: RevisionStatus.PENDING,
        };
        
        const updatedProject = { ...selectedProject, revisions: [...(selectedProject.revisions || []), revisionToAdd] };

        setProjects(prevProjects => prevProjects.map(p => p.id === selectedProject.id ? updatedProject : p));
        setSelectedProject(updatedProject); // Update state for the open modal

        setNewRevision({ adminNotes: '', deadline: '', freelancerId: '' }); // Reset form
        showNotification('Revisi baru berhasil ditambahkan.');
    };
    
    const handleShareRevisionLink = (revision: Revision) => {
        if (!selectedProject) return;
        const url = `${window.location.origin}${window.location.pathname}#/revision-form?projectId=${selectedProject.id}&freelancerId=${revision.freelancerId}&revisionId=${revision.id}`;
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Tautan revisi berhasil disalin!');
        }, (err) => {
            showNotification('Gagal menyalin tautan.');
            console.error('Could not copy text: ', err);
        });
    };

    const modalTitles: { [key: string]: string } = {
        total: 'Daftar Semua Proyek',
        completed: 'Daftar Proyek Selesai',
        deadline: 'Proyek dengan Deadline Dekat',
        unpaid: 'Proyek yang Belum Lunas'
    };

    let modalContentList: Project[] = [];
    if (activeStatModal === 'total') modalContentList = projects;
    else if (activeStatModal === 'completed') modalContentList = projectsCompleted;
    else if (activeStatModal === 'deadline') modalContentList = deadlineSoonProjects;
    else if (activeStatModal === 'unpaid') modalContentList = unpaidProjects;

    const activeProjects = filteredProjects.filter(p => p.status !== ProjectStatus.COMPLETED && p.status !== ProjectStatus.CANCELLED);
    const completedAndCancelledProjects = filteredProjects.filter(p => p.status === ProjectStatus.COMPLETED || p.status === ProjectStatus.CANCELLED);

    const editingSubStatusOptions = ["Editing Video", "Editing Album", "Editing Foto"];
    const printingSubStatusOptions = ["Cetak Bingkai", "Cetak Album", "Flashdisk", "Lainnya"];


    return (
        <div className="space-y-8">
            <PageHeader title="Manajemen Proyek" subtitle="Lacak semua proyek dari awal hingga selesai.">
                { !isFormVisible && (
                    <button onClick={() => handleOpenForm('add')} className="button-primary inline-flex items-center gap-2">
                        <PlusIcon className="w-5 h-5"/>
                        Tambah Proyek
                    </button>
                )}
            </PageHeader>
            
            {isFormVisible && (
                <div className="bg-brand-surface p-6 rounded-2xl mb-6 shadow-lg border border-brand-border">
                    <h3 className="text-xl font-semibold text-gradient border-b border-gray-700/50 pb-4 mb-6">{formMode === 'add' ? 'Tambah Proyek Baru (Operasional)' : 'Edit Proyek'}</h3>
                    <form onSubmit={handleFormSubmit} className="space-y-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                            {/* Column 1 */}
                            <div className="space-y-4">
                                <div className="input-group"><select id="clientId" name="clientId" value={formData.clientId} onChange={handleClientChange} className="input-field" required><option value="">Pilih Klien...</option>{clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select><label htmlFor="clientId" className="input-label">Pilih Klien</label></div>
                                <div className="input-group"><input type="text" id="clientName" name="clientName" value={formData.clientName} className="input-field bg-brand-input" readOnly required placeholder=" "/><label htmlFor="clientName" className="input-label">Nama Klien</label></div>
                                <div className="input-group"><input type="text" id="projectName" name="projectName" value={formData.projectName} onChange={handleFormChange} className="input-field" placeholder=" " required/><label htmlFor="projectName" className="input-label">Nama Proyek</label></div>
                                <div className="input-group"><select id="projectType" name="projectType" value={formData.projectType} onChange={handleFormChange} className="input-field" required><option value="">Pilih jenis...</option>{profile.projectTypes.map(t => <option key={t} value={t}>{t}</option>)}</select><label htmlFor="projectType" className="input-label">Jenis Proyek</label></div>
                                <div className="input-group"><select id="status" name="status" value={formData.status} onChange={handleFormChange} className="input-field"><option value="">Pilih status...</option>{Object.values(ProjectStatus).map(s => <option key={s} value={s}>{s}</option>)}</select><label htmlFor="status" className="input-label">Status</label></div>
                                {formData.status === ProjectStatus.EDITING && <div className="input-group"><select id="subStatus" name="subStatus" value={formData.subStatus} onChange={handleFormChange} className="input-field"><option value="">Pilih Sub-Status...</option>{editingSubStatusOptions.map(s => <option key={s} value={s}>{s}</option>)}</select><label htmlFor="subStatus" className="input-label">Sub-Status Editing</label></div>}
                                {formData.status === ProjectStatus.PRINTING && <div className="input-group"><select id="subStatus" name="subStatus" value={formData.subStatus} onChange={handleFormChange} className="input-field"><option value="">Pilih Sub-Status...</option>{printingSubStatusOptions.map(s => <option key={s} value={s}>{s}</option>)}</select><label htmlFor="subStatus" className="input-label">Sub-Status Cetak</label></div>}
                                {formData.status === ProjectStatus.SHIPPED && <div className="input-group"><input type="text" id="shippingDetails" name="shippingDetails" value={formData.shippingDetails} onChange={handleFormChange} className="input-field" placeholder="cth: Flashdisk via JNE AWB123" /><label htmlFor="shippingDetails" className="input-label">Detail Pengiriman</label></div>}
                            </div>
                            {/* Column 2 */}
                            <div className="space-y-4">
                                <div className="input-group"><input type="text" id="location" name="location" value={formData.location} onChange={handleFormChange} className="input-field" placeholder=" "/><label htmlFor="location" className="input-label">Lokasi</label></div>
                                <div className="input-group"><input type="date" id="date" name="date" value={formData.date} onChange={handleFormChange} className="input-field" placeholder=" "/><label htmlFor="date" className="input-label">Tanggal Acara</label></div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="input-group"><input type="text" id="startTime" name="startTime" value={formData.startTime} onChange={handleFormChange} className="input-field" placeholder="cth: Akad: 08:00 "/><label htmlFor="startTime" className="input-label">Waktu Mulai</label></div>
                                    <div className="input-group"><input type="text" id="endTime" name="endTime" value={formData.endTime} onChange={handleFormChange} className="input-field" placeholder="cth: Resepsi: 19:00"/><label htmlFor="endTime" className="input-label">Waktu Selesai</label></div>
                                </div>
                                <div className="input-group"><input type="date" id="deadlineDate" name="deadlineDate" value={formData.deadlineDate} onChange={handleFormChange} className="input-field" placeholder=" "/><label htmlFor="deadlineDate" className="input-label">Deadline</label></div>
                                <div className="input-group"><textarea id="notes" name="notes" value={formData.notes} onChange={handleFormChange} className="input-field" placeholder=" "></textarea><label htmlFor="notes" className="input-label">Catatan Tambahan</label></div>
                                <div className="input-group"><input type="url" id="driveLink" name="driveLink" value={formData.driveLink || ''} onChange={handleFormChange} className="input-field" placeholder=" "/><label htmlFor="driveLink" className="input-label">Link Moodboard (GDrive)</label></div>
                                <div className="input-group"><input type="url" id="clientDriveLink" name="clientDriveLink" value={formData.clientDriveLink || ''} onChange={handleFormChange} className="input-field" placeholder=" "/><label htmlFor="clientDriveLink" className="input-label">Link File dari Klien</label></div>
                                <div className="input-group"><input type="url" id="finalDriveLink" name="finalDriveLink" value={formData.finalDriveLink || ''} onChange={handleFormChange} className="input-field" placeholder=" "/><label htmlFor="finalDriveLink" className="input-label">Link File Jadi</label></div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-700/50">
                            <h4 className="font-semibold text-gradient mb-4">Tim</h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                                {Object.entries(teamByRole).map(([role, members]) => (
                                    <div key={role}>
                                        <h5 className="font-medium text-brand-text-secondary mb-2">{role}</h5>
                                        <div className="space-y-3">
                                            {members.map(member => (
                                                <div key={member.id}>
                                                    <label className="flex items-center">
                                                        <input type="checkbox" checked={formData.team.some(t => t.memberId === member.id)} onChange={() => handleTeamChange(member)} className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-brand-accent focus:ring-brand-accent"/>
                                                        <span className="ml-2 text-sm">{member.name}</span>
                                                    </label>
                                                     {formData.team.some(t => t.memberId === member.id) && (
                                                      <div className="mt-2 pl-6 space-y-2">
                                                        <div className="input-group">
                                                            <input 
                                                                type="number" 
                                                                id={`fee-${member.id}`}
                                                                value={formData.team.find(t => t.memberId === member.id)?.fee || ''} 
                                                                onChange={(e) => handleTeamFeeChange(member.id, Number(e.target.value))}
                                                                className="input-field"
                                                                onClick={e => e.stopPropagation()}
                                                                placeholder=" "
                                                            />
                                                            <label htmlFor={`fee-${member.id}`} className="input-label">Fee</label>
                                                        </div>
                                                        <div className="input-group">
                                                            <input 
                                                                type="number" 
                                                                id={`reward-${member.id}`}
                                                                value={formData.team.find(t => t.memberId === member.id)?.reward || ''} 
                                                                onChange={(e) => handleTeamRewardChange(member.id, Number(e.target.value))}
                                                                className="input-field"
                                                                onClick={e => e.stopPropagation()}
                                                                placeholder=" "
                                                            />
                                                            <label htmlFor={`reward-${member.id}`} className="input-label">Hadiah</label>
                                                        </div>
                                                      </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                        <div className="flex justify-end items-center gap-3 pt-6 mt-4 border-t border-gray-700/50">
                            <button type="button" onClick={handleCloseForm} className="button-secondary">Batal</button>
                            <button type="submit" className="button-primary">{formMode === 'add' ? 'Simpan Proyek' : 'Update Proyek'}</button>
                        </div>
                    </form>
                </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <div className="widget-animate cursor-pointer transition-transform duration-200 hover:scale-105" style={{ animationDelay: '100ms' }} onClick={() => setActiveStatModal('total')}>
                    <StatCard icon={<FolderKanbanIcon className="w-6 h-6" />} iconBgColor="bg-blue-500/20" iconColor="text-blue-400" title="Total Proyek" value={summary.total.toString()} />
                </div>
                <div className="widget-animate cursor-pointer transition-transform duration-200 hover:scale-105" style={{ animationDelay: '200ms' }} onClick={() => setActiveStatModal('completed')}>
                    <StatCard icon={<CheckSquareIcon className="w-6 h-6" />} iconBgColor="bg-brand-success/20" iconColor="text-brand-success" title="Proyek Selesai" value={summary.completed.toString()} />
                </div>
                <div className="widget-animate cursor-pointer transition-transform duration-200 hover:scale-105" style={{ animationDelay: '300ms' }} onClick={() => setActiveStatModal('deadline')}>
                    <StatCard icon={<CalendarIcon className="w-6 h-6" />} iconBgColor="bg-yellow-500/20" iconColor="text-yellow-400" title="Deadline Dekat" value={summary.deadlineSoon.toString()} />
                </div>
                <div className="widget-animate cursor-pointer transition-transform duration-200 hover:scale-105" style={{ animationDelay: '400ms' }} onClick={() => setActiveStatModal('unpaid')}>
                    <StatCard icon={<AlertCircleIcon className="w-6 h-6" />} iconBgColor="bg-brand-danger/20" iconColor="text-brand-danger" title="Belum Lunas" value={summary.unpaid.toString()} />
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6 widget-animate" style={{ animationDelay: '500ms' }}>
                 <div className="input-group flex-grow !mt-0">
                    <input type="text" placeholder=" " value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="input-field"/>
                    <label className="input-label">Cari proyek atau klien...</label>
                </div>
                {viewMode === 'list' && (
                    <div className="input-group !mt-0">
                        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as ProjectStatus | 'all')} className="input-field">
                            <option value="all">Semua Status</option>
                            {Object.values(ProjectStatus).map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <label className="input-label">Status</label>
                    </div>
                )}
                <div className="flex items-center gap-1 p-1 bg-brand-bg rounded-xl md:ml-auto">
                    <button onClick={() => setViewMode('list')} className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors ${viewMode === 'list' ? 'bg-brand-surface shadow-sm text-brand-text-light' : 'text-brand-text-secondary hover:text-brand-text-light'}`}>
                        <ListIcon className="w-5 h-5"/> Daftar
                    </button>
                    <button onClick={() => setViewMode('kanban')} className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors ${viewMode === 'kanban' ? 'bg-brand-surface shadow-sm text-brand-text-light' : 'text-brand-text-secondary hover:text-brand-text-light'}`}>
                        <LayoutGridIcon className="w-5 h-5"/> Papan
                    </button>
                </div>
            </div>
            
            <div className="widget-animate" style={{ animationDelay: '600ms' }}>
                {viewMode === 'list' ? (
                     <div className="space-y-6">
                        <div className="bg-brand-surface rounded-2xl shadow-lg border border-brand-border">
                            <button onClick={() => setActiveSectionOpen(p => !p)} className="w-full flex justify-between items-center p-4">
                                <h3 className="font-semibold text-lg text-brand-text-light">Proyek Aktif ({activeProjects.length})</h3>
                                {activeSectionOpen ? <ArrowUpIcon className="w-5 h-5 text-brand-text-secondary"/> : <ArrowDownIcon className="w-5 h-5 text-brand-text-secondary"/>}
                            </button>
                            {activeSectionOpen && (
                                <ProjectListView 
                                    projects={activeProjects}
                                    handleOpenDetailModal={handleOpenDetailModal}
                                    handleOpenForm={handleOpenForm}
                                    handleProjectDelete={handleProjectDelete}
                                />
                            )}
                        </div>
                        <div className="bg-brand-surface rounded-2xl shadow-lg border border-brand-border">
                            <button onClick={() => setCompletedSectionOpen(p => !p)} className="w-full flex justify-between items-center p-4">
                                <h3 className="font-semibold text-lg text-brand-text-light">Proyek Selesai & Dibatalkan ({completedAndCancelledProjects.length})</h3>
                                {completedSectionOpen ? <ArrowUpIcon className="w-5 h-5 text-brand-text-secondary"/> : <ArrowDownIcon className="w-5 h-5 text-brand-text-secondary"/>}
                            </button>
                            {completedSectionOpen && (
                                <ProjectListView 
                                    projects={completedAndCancelledProjects}
                                    handleOpenDetailModal={handleOpenDetailModal}
                                    handleOpenForm={handleOpenForm}
                                    handleProjectDelete={handleProjectDelete}
                                />
                            )}
                        </div>
                    </div>
                ) : (
                    <ProjectKanbanView 
                        projects={filteredProjects}
                        handleOpenDetailModal={handleOpenDetailModal}
                        draggedProjectId={draggedProjectId}
                        handleDragStart={handleDragStart}
                        handleDragOver={handleDragOver}
                        handleDrop={handleDrop}
                    />
                )}
            </div>
            {selectedProject && (
                <Modal 
                    isOpen={isDetailModalOpen} 
                    onClose={() => setIsDetailModalOpen(false)} 
                    title={`Detail Proyek: ${selectedProject.projectName}`}
                    size="3xl"
                >
                    <div className="border-b border-brand-border">
                        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                            <button onClick={() => setDetailTab('details')} className={`shrink-0 whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${detailTab === 'details' ? 'border-brand-accent text-brand-accent' : 'border-transparent text-brand-text-secondary hover:text-brand-text-light'}`}>
                                Detail
                            </button>
                            <button onClick={() => setDetailTab('files')} className={`shrink-0 whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${detailTab === 'files' ? 'border-brand-accent text-brand-accent' : 'border-transparent text-brand-text-secondary hover:text-brand-text-light'}`}>
                                File & Tautan
                            </button>
                            {(selectedProject.status === ProjectStatus.EDITING || (selectedProject.revisions && selectedProject.revisions.length > 0)) && (
                                <button onClick={() => setDetailTab('revisions')} className={`shrink-0 whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${detailTab === 'revisions' ? 'border-brand-accent text-brand-accent' : 'border-transparent text-brand-text-secondary hover:text-brand-text-light'}`}>
                                    Revisi
                                </button>
                            )}
                        </nav>
                    </div>

                    <div className="pt-5">
                    {detailTab === 'details' && (
                        <div className="space-y-4 text-sm">
                            <p><strong>Klien:</strong> {selectedProject.clientName}</p>
                            <p><strong>Tanggal Acara:</strong> {new Date(selectedProject.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            <p><strong>Lokasi:</strong> {selectedProject.location}</p>
                            
                            <div className="pt-4 mt-4 border-t border-gray-700/50">
                                <h4 className="font-semibold text-gradient mb-2">Paket & Biaya</h4>
                                <p><strong>Paket:</strong> {selectedProject.packageName || 'Belum diatur'}</p>
                                {selectedProject.addOns.length > 0 && <p><strong>Add-ons:</strong> {selectedProject.addOns.map(a => a.name).join(', ')}</p>}
                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <div><p className="text-brand-text-secondary">Total Biaya Proyek</p><p className="font-semibold text-base">{formatCurrency(selectedProject.totalCost)}</p></div>
                                    <div><p className="text-brand-text-secondary">Status Pembayaran</p><p className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusClass(selectedProject.paymentStatus)}`}>{selectedProject.paymentStatus}</p></div>
                                </div>
                                {selectedProject.dpProofUrl && (
                                    <div className="mt-2">
                                        <strong>Bukti Pembayaran DP:</strong>
                                        <a href={selectedProject.dpProofUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline ml-2">Lihat Bukti</a>
                                    </div>
                                )}
                            </div>

                            <div className="pt-4 mt-4 border-t border-gray-700/50">
                                <h4 className="font-semibold text-gradient mb-2">Tim & Catatan</h4>
                                <p><strong>Tim yang Bertugas:</strong> {selectedProject.team.length > 0 ? selectedProject.team.map(t => `${t.name} (${t.role})`).join(', ') : 'Belum ada tim yang ditugaskan'}</p>
                                {selectedProject.notes && <p><strong>Catatan:</strong> {selectedProject.notes}</p>}
                                {selectedProject.shippingDetails && <p><strong>Detail Pengiriman:</strong> {selectedProject.shippingDetails}</p>}
                            </div>

                            <div className="pt-4 mt-4 border-t border-gray-700/50 text-right">
                                <button onClick={() => handleOpenBriefingModal(selectedProject)} className="button-secondary inline-flex items-center gap-2"><Share2Icon className="w-4 h-4" />Bagikan Briefing Tim</button>
                            </div>
                        </div>
                    )}
                    {detailTab === 'files' && (
                        <div className="space-y-4 text-sm">
                            <div className="p-3 bg-brand-bg rounded-lg space-y-2">
                                <p><strong>Moodboard/Brief:</strong> {selectedProject.driveLink ? <a href={selectedProject.driveLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline ml-2">Buka Tautan</a> : <span className="text-brand-text-secondary ml-2">Tidak ada</span>}</p>
                                <p><strong>File Mentah dari Klien:</strong> {selectedProject.clientDriveLink ? <a href={selectedProject.clientDriveLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline ml-2">Buka Tautan</a> : <span className="text-brand-text-secondary ml-2">Tidak ada</span>}</p>
                                <p><strong>File Hasil Jadi:</strong> {selectedProject.finalDriveLink ? <a href={selectedProject.finalDriveLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline ml-2">Buka Tautan</a> : <span className="text-brand-text-secondary ml-2">Tidak ada</span>}</p>
                            </div>
                            
                            {(selectedProject.revisions || []).length > 0 && (
                                <div>
                                    <h4 className="font-semibold text-gradient mt-6 mb-2">Tautan Revisi</h4>
                                    <div className="space-y-2">
                                    {(selectedProject.revisions || []).map(rev => (
                                    <div key={rev.id} className="p-3 bg-brand-bg rounded-lg">
                                        <p><strong>Revisi dari {teamMembers.find(t=>t.id === rev.freelancerId)?.name}:</strong> {rev.driveLink ? <a href={rev.driveLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline ml-2">Buka Tautan</a> : <span className="text-brand-text-secondary ml-2">Belum diunggah</span>}</p>
                                    </div>
                                    ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    {detailTab === 'revisions' && (
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-semibold text-gradient text-base mb-3">Daftar Revisi</h4>
                                <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                                    {(selectedProject.revisions && selectedProject.revisions.length > 0) ? selectedProject.revisions.map(rev => (
                                        <div key={rev.id} className="p-3 bg-brand-bg rounded-lg">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-semibold text-brand-text-light">Untuk: {teamMembers.find(t => t.id === rev.freelancerId)?.name || 'N/A'}</p>
                                                    <p className="text-xs text-brand-text-secondary">Deadline: {new Date(rev.deadline).toLocaleDateString('id-ID')}</p>
                                                </div>
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRevisionStatusClass(rev.status)}`}>{rev.status}</span>
                                            </div>
                                            <p className="text-sm mt-2 pt-2 border-t border-brand-border whitespace-pre-wrap">{rev.adminNotes}</p>
                                            <button onClick={() => handleShareRevisionLink(rev)} className="text-xs font-semibold text-brand-accent hover:underline mt-2 inline-flex items-center gap-1"><Share2Icon className="w-3 h-3"/> Bagikan Tautan</button>
                                        </div>
                                    )) : <p className="text-center text-sm text-brand-text-secondary py-8">Belum ada revisi untuk proyek ini.</p>}
                                </div>
                            </div>
                            <div className="pt-6 border-t border-brand-border">
                                <form onSubmit={handleAddRevision} className="space-y-4">
                                     <h4 className="font-semibold text-gradient text-base">Tambah Revisi Baru</h4>
                                    <div className="input-group"><textarea value={newRevision.adminNotes} onChange={e => setNewRevision(p => ({...p, adminNotes: e.target.value}))} className="input-field" placeholder=" " rows={3} required></textarea><label className="input-label">Catatan Revisi</label></div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="input-group"><input type="date" value={newRevision.deadline} onChange={e => setNewRevision(p => ({...p, deadline: e.target.value}))} className="input-field" placeholder=" " required /><label className="input-label">Tenggat Waktu</label></div>
                                        <div className="input-group"><select value={newRevision.freelancerId} onChange={e => setNewRevision(p => ({...p, freelancerId: e.target.value}))} className="input-field" required><option value="">Pilih Freelancer...</option>{selectedProject.team.map(t => <option key={t.memberId} value={t.memberId}>{t.name}</option>)}</select><label className="input-label">Ditugaskan Untuk</label></div>
                                    </div>
                                    <div className="text-right"><button type="submit" className="button-primary">Simpan Revisi</button></div>
                                </form>
                            </div>
                        </div>
                    )}
                    </div>
                </Modal>
            )}
            
            <Modal
                isOpen={isBriefingModalOpen}
                onClose={() => setIsBriefingModalOpen(false)}
                title="Bagikan Briefing Proyek"
                size="lg"
            >
                <div className="space-y-4">
                    <p className="text-sm text-brand-text-secondary">Pesan berikut siap untuk dibagikan ke tim Anda.</p>
                    <div className="p-4 bg-brand-bg rounded-lg max-h-64 overflow-y-auto">
                        <pre className="text-sm text-brand-text-primary whitespace-pre-wrap font-sans">{briefingText}</pre>
                    </div>
                    
                    {(googleCalendarLink || icsDataUri) && (
                        <div className="pt-4 border-t border-brand-border">
                            <h5 className="text-sm font-semibold text-brand-text-secondary mb-2">Tambahkan ke Kalender Tim:</h5>
                            <div className="flex items-center gap-2">
                                {googleCalendarLink && (
                                    <a
                                        href={googleCalendarLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="button-secondary text-sm inline-flex items-center gap-2"
                                    >
                                        <CalendarIcon className="w-4 h-4" /> Google Calendar
                                    </a>
                                )}
                                {icsDataUri && (
                                     <a
                                        href={icsDataUri}
                                        download={`${selectedProject?.projectName || 'acara'}.ics`}
                                        className="button-secondary text-sm inline-flex items-center gap-2"
                                    >
                                        <CalendarIcon className="w-4 h-4" /> iCal/Outlook
                                    </a>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end items-center gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => {
                                navigator.clipboard.writeText(briefingText);
                                showNotification('Briefing disalin ke clipboard!');
                            }}
                            className="button-secondary"
                        >
                            Salin Teks
                        </button>
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="button-primary"
                        >
                            Bagikan ke WhatsApp
                        </a>
                    </div>
                </div>
            </Modal>
             <Modal isOpen={!!activeStatModal} onClose={() => setActiveStatModal(null)} title={activeStatModal ? modalTitles[activeStatModal] : ''} size="2xl">
                <div className="max-h-[60vh] overflow-y-auto pr-2">
                    {modalContentList.length > 0 ? (
                        <div className="space-y-3">
                            {modalContentList.map(project => (
                                <div key={project.id} className="p-3 bg-brand-bg rounded-lg flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold text-brand-text-light">{project.projectName}</p>
                                        <p className="text-sm text-brand-text-secondary">{project.clientName}</p>
                                    </div>
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(project.status)}`}>
                                        {project.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : <p className="text-center text-brand-text-secondary py-8">Tidak ada proyek yang sesuai.</p>}
                </div>
            </Modal>
        </div>
    );
};

export default Projects;
