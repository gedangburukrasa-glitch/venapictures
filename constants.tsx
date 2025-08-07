



import React from 'react';
import { ViewType, ProjectStatus, TransactionType, PaymentStatus, PocketType, ClientStatus, LeadStatus, ContactChannel, CardType, AssetStatus, PerformanceNoteType, SatisfactionLevel, RevisionStatus, FreelancerFeedback, Notification, QRCodeRecord, SocialMediaPost, PostType, PostStatus, PromoCode } from './types';
import type { User, Client, Project, Package, TeamMember, Transaction, FinancialPocket, AddOn, Profile, TeamProjectPayment, TeamPaymentRecord, AssignedTeamMember, Lead, NotificationSettings, SecuritySettings, RewardLedgerEntry, Card, Asset, PerformanceNote, ClientFeedback, Contract } from './types';

// --- ICONS (NEW THEME) ---
// A collection of SVG icon components used throughout the application.
export const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);
export const UsersIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
export const FolderKanbanIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/></svg>
);
export const BriefcaseIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
);
export const DollarSignIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
);
export const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
);
export const PackageIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
);
export const SettingsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0 2l.15.08a2 2 0 0 0 .73-2.73l.22.38a2 2 0 0 0-2.73-.73l-.15-.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
);
export const ChartPieIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
);
export const TargetIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
);
export const EyeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
);
export const PencilIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
);
export const Trash2Icon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
);
export const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
);
export const ChevronLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 18 15 12 9 6 15 6"/></svg>
);
export const ChevronRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
);
export const FileTextIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
);
export const PrinterIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
);
export const CreditCardIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
);
export const CashIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><circle cx="8" cy="12" r="2"/><path d="M6 12h2"/><path d="M14 12h4"/></svg>
);
export const QrCodeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="5" height="5" rx="1"/><rect x="16" y="3" width="5" height="5" rx="1"/><rect x="3" y="16" width="5" height="5" rx="1"/><path d="M21 16v3a2 2 0 0 1-2 2h-1"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1a2 2 0 0 0-2-2h-1"/></svg>
);
export const Share2Icon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
);
export const HistoryIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
);
export const AlertCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
);
export const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);
export const PiggyBankIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19.45 5.55 21 7.1c.82.82.82 2.15 0 2.97l-2.02 2.02c-.38.38-.89.6-1.42.6h-3.09a2 2 0 0 1-1.41-.59L10 9.5a2 2 0 0 0-2.83 0L2.83 13.83a2 2 0 0 0 0 2.83L4.24 18c.82.82 2.15.82 2.97 0l2.59-2.59c.38-.38.89-.6 1.42-.6h3.09a2 2 0 0 1 1.41.59l3.42 3.42c.82.82 2.15.82 2.97 0l1.41-1.41"/><path d="m11 16.5 6-6"/><path d="M15 5h.01"/></svg>
);
export const LockIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
);
export const Users2Icon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 19a6 6 0 0 0-12 0"/><circle cx="8" cy="10" r="4"/><path d="M22 19a6 6 0 0 0-6-6 4 4 0 1 0 0-8"/></svg>
);
export const ClipboardListIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>
);
export const LightbulbIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
);
export const MessageSquareIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
);
export const PhoneIncomingIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 2 16 8 22 8"/><line x1="22" y1="2" x2="16" y2="8"/><path d="M22 16.5A10 10 0 0 1 5.5 8"/><path d="M2 7.9A15 15 0 0 1 15.1 3h5.9"/></svg>
);
export const ListIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
);
export const LayoutGridIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/></svg>
);
export const TrendingUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
);
export const TrendingDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/>
        <polyline points="16 17 22 17 22 11"/>
    </svg>
);
export const LogOutIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
);
export const KeyIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>
);
export const ArrowUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m19 12-7-7-7-7"/></svg>
);
export const ArrowDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
);
export const CheckSquareIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
);
export const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
export const SunIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
);
export const MoonIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
);
export const MapPinIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
);
export const BarChart2Icon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
);
export const DownloadIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
);
export const CameraIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
);
export const SmileIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
);
export const ThumbsUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg>
);
export const MehIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="8" y1="15" x2="16" y2="15"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
);
export const FrownIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
);
export const UserCheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
);
export const PercentIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
);
export const SendIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
);



// --- HELPERS ---
// Utility functions used across multiple components.
export const getProjectStatusColor = (status: ProjectStatus): string => {
    switch (status) {
        case ProjectStatus.COMPLETED: return '#10b981'; // emerald-500
        case ProjectStatus.CONFIRMED: return '#3b82f6'; // blue-500
        case ProjectStatus.EDITING: return '#8b5cf6'; // violet-500
        case ProjectStatus.PRINTING: return '#f97316'; // orange-500
        case ProjectStatus.PENDING: return '#eab308'; // yellow-500
        case ProjectStatus.CANCELLED: return '#ef4444'; // red-500
        case ProjectStatus.PREPARATION: return '#6366f1'; // indigo-500
        case ProjectStatus.SHIPPED: return '#14b8a6'; // teal-500
        default: return '#64748b'; // slate-500
    }
};


// --- NAVIGATION ---
// Defines the items available in the main sidebar navigation.
export const NAV_ITEMS = [
  { view: ViewType.DASHBOARD, label: 'Dashboard', icon: HomeIcon },
  { view: ViewType.PROSPEK, label: 'Prospek', icon: LightbulbIcon },
  { view: ViewType.CLIENTS, label: 'Manajemen Klien', icon: UsersIcon },
  { view: ViewType.PROJECTS, label: 'Proyek', icon: FolderKanbanIcon },
  { view: ViewType.TEAM, label: 'Freelancer', icon: BriefcaseIcon },
  { view: ViewType.FINANCE, label: 'Keuangan', icon: DollarSignIcon },
  { view: ViewType.CALENDAR, label: 'Kalender', icon: CalendarIcon },
  { view: ViewType.CLIENT_REPORTS, label: 'Laporan Klien', icon: ChartPieIcon },
  { view: ViewType.PACKAGES, label: 'Paket Layanan', icon: PackageIcon },
  { view: ViewType.PROMO_CODES, label: 'Kode Promo', icon: PercentIcon },
  { view: ViewType.ASSETS, label: 'Manajemen Aset', icon: CameraIcon },
  { view: ViewType.CONTRACTS, label: 'Kontrak Kerja', icon: FileTextIcon },
  { view: ViewType.QR_GENERATOR, label: 'QR Generator', icon: QrCodeIcon },
  { view: ViewType.SOCIAL_MEDIA_PLANNER, label: 'Perencana Medsos', icon: Share2Icon },
  { view: ViewType.SETTINGS, label: 'Pengaturan', icon: SettingsIcon },
];

// --- MOCK DATA (RESTRUCTURED & INTEGRATED) ---
// This section contains all the mock data to populate the application.
// The data has been refactored for consistency, with transactions as the single source of truth for financial calculations.

// --- Base Static Data ---
export const MOCK_USERS: User[] = [
    { id: 'USR_ADMIN', email: 'admin@venapictures.com', password: 'password123', fullName: 'Admin Vena', role: 'Admin' },
    { 
        id: 'USR_MEMBER_1', 
        email: 'boceng@venapictures.com', 
        password: 'password123', 
        fullName: 'Boceng Staf', 
        role: 'Member',
        permissions: [
            ViewType.DASHBOARD,
            ViewType.PROSPEK,
            ViewType.CLIENTS,
            ViewType.PROJECTS,
            ViewType.TEAM,
            ViewType.CALENDAR,
            ViewType.CLIENT_REPORTS,
            ViewType.PACKAGES,
            ViewType.PROMO_CODES,
            ViewType.ASSETS,
            ViewType.CONTRACTS,
            ViewType.QR_GENERATOR,
            ViewType.SOCIAL_MEDIA_PLANNER,
        ]
    }
];

export const MOCK_USER_PROFILE: Profile = {
    fullName: "Admin Vena",
    email: "admin@venapictures.com",
    phone: "081234567890",
    companyName: "Vena Pictures",
    website: "https://venapictures.com",
    address: "Jl. Raya Fotografi No. 123, Jakarta, Indonesia",
    bankAccount: "BCA 1234567890 a/n Vena Pictures",
    authorizedSigner: "Vena Pictures Management",
    idNumber: "3171234567890001",
    bio: "Vendor fotografi pernikahan profesional dengan spesialisasi pada momen-momen otentik dan sinematik.",
    incomeCategories: ["DP Proyek", "Pelunasan Proyek", "Penjualan Album", "Sewa Alat", "Lain-lain"],
    expenseCategories: ["Gaji Freelancer", "Hadiah Freelancer", "Penarikan Hadiah Freelancer", "Sewa Tempat", "Transportasi", "Konsumsi", "Marketing", "Sewa Alat", "Cetak Album", "Operasional Kantor", "Transfer Internal", "Penutupan Anggaran"],
    projectTypes: ["Pernikahan", "Pre-wedding", "Lamaran", "Acara Korporat", "Ulang Tahun"],
    eventTypes: ["Meeting Klien", "Survey Lokasi", "Libur", "Workshop", "Lainnya"],
    assetCategories: ["Kamera", "Lensa", "Drone", "Lighting", "Audio", "Tripod & Stabilizer", "Lainnya"],
    notificationSettings: {
        newProject: true,
        paymentConfirmation: true,
        deadlineReminder: true,
    },
    securitySettings: {
        twoFactorEnabled: false,
    },
    briefingTemplate: "Tim terbaik! Mari berikan yang terbaik untuk klien kita. Jaga semangat, komunikasi, dan fokus pada detail. Let's create magic!"
};

const createMockDate = (monthOffset: number, day: number) => {
    const date = new Date();
    date.setMonth(date.getMonth() + monthOffset);
    date.setDate(day);
    return date.toISOString().split('T')[0];
};

export const MOCK_PACKAGES: Package[] = [
    { id: 'PKG001', name: 'Paket Silver', price: 15000000, description: '2 Fotografer, 1 Videografer, Album Cetak, 8 Jam Liputan' },
    { id: 'PKG002', name: 'Paket Gold', price: 25000000, description: '2 Fotografer, 2 Videografer, Album Cetak Premium, Same Day Edit, 10 Jam Liputan' },
    { id: 'PKG003', name: 'Paket Platinum', price: 40000000, description: '3 Fotografer, 3 Videografer, Album Kustom, SDE, Drone, 12 Jam Liputan' },
];

export const MOCK_ADDONS: AddOn[] = [
    { id: 'ADD001', name: 'Same Day Edit Video', price: 3500000 },
    { id: 'ADD002', name: 'Sewa Drone', price: 2000000 },
    { id: 'ADD003', name: 'Cetak Kanvas 60x40', price: 750000 },
    { id: 'ADD004', name: 'Jam Liputan Tambahan', price: 1000000 },
];

export const MOCK_QR_CODES: QRCodeRecord[] = [
    {
        id: 'QR001',
        name: 'Tanda Tangan Digital Resmi',
        type: 'text',
        content: 'Digitally Signed and Verified by Vena Pictures Management.',
    }
];

export const MOCK_PROMO_CODES: PromoCode[] = [
    { id: 'PROMO001', code: 'VENA10', discountType: 'percentage', discountValue: 10, isActive: true, usageCount: 2, maxUsage: 10, expiryDate: createMockDate(3, 1), createdAt: createMockDate(-1, 1) },
    { id: 'PROMO002', code: 'DISKON500K', discountType: 'fixed', discountValue: 500000, isActive: true, usageCount: 0, maxUsage: null, expiryDate: null, createdAt: createMockDate(-2, 1) },
    { id: 'PROMO003', code: 'EXPIRED', discountType: 'percentage', discountValue: 15, isActive: false, usageCount: 5, maxUsage: 5, expiryDate: createMockDate(-1, 1), createdAt: createMockDate(-6, 1) },
];


// --- Core Entities (The base for our data story) ---
export const MOCK_CLIENTS: Client[] = [
  { id: 'CLI001', name: 'Andi & Siska', email: 'andi.siska@email.com', phone: '081111111111', since: createMockDate(-1, 15), instagram: '@andisiska', status: ClientStatus.ACTIVE, lastContact: createMockDate(0, -5), portalAccessId: 'a7c5b8e1-4f2a-4f9c-8b1e-3e1f7c8b4a9c' },
  { id: 'CLI002', name: 'Budi Santoso', email: 'budi.s@email.com', phone: '082222222222', since: createMockDate(-3, 20), instagram: '@budisan', status: ClientStatus.INACTIVE, lastContact: createMockDate(0, -40), portalAccessId: 'f3b9c1d8-6e5a-4b2a-9c8d-1e7a6b5c4d3e' },
  { id: 'CLI003', name: 'Citra Lestari', email: 'citra.l@email.com', phone: '083333333333', since: createMockDate(-2, 5), instagram: '@citralestari', status: ClientStatus.INACTIVE, lastContact: createMockDate(0, -10), portalAccessId: 'b9e8c7d6-3a2b-4c1d-8e7f-6a5b4c3d2e1f' },
  { id: 'CLI004', name: 'Fajar Nugraha', email: 'fajar.n@email.com', phone: '084444444444', since: createMockDate(0, -2), instagram: '@fajarnugraha', status: ClientStatus.ACTIVE, lastContact: createMockDate(0, -1), portalAccessId: 'd1e2f3a4-5b6c-4d7e-8f9a-0b1c2d3e4f5a' },
  { id: 'CLI005', name: 'Eko Prasetyo', email: 'eko.p@email.com', phone: '085555555555', since: createMockDate(0, -12), instagram: '@ekopras', status: ClientStatus.ACTIVE, lastContact: createMockDate(0, -2), portalAccessId: 'c6b7d8e9-1a2b-4c5d-8e9f-0a1b2c3d4e5f' },
];

export const MOCK_LEADS: Lead[] = [
  { id: 'LEAD001', name: 'Fajar Nugraha', contactChannel: ContactChannel.INSTAGRAM, location: 'Jakarta', status: LeadStatus.CONVERTED, date: createMockDate(0, -2), notes: 'Converted to client CLI004' },
  { id: 'LEAD002', name: 'Gita Permata', contactChannel: ContactChannel.WHATSAPP, location: 'Bandung', status: LeadStatus.DISCUSSION, date: createMockDate(0, -5) },
  { id: 'LEAD003', name: 'Hendra Wijaya', contactChannel: ContactChannel.REFERRAL, location: 'Surabaya', status: LeadStatus.FOLLOW_UP, date: createMockDate(0, -8) },
  { id: 'LEAD004', name: 'Indah Sari', contactChannel: ContactChannel.WEBSITE, location: 'Jakarta', status: LeadStatus.REJECTED, date: createMockDate(-1, 15) },
];

let teamMembersData: TeamMember[] = [
  { id: 'TM001', name: 'Bambang Sudiro', role: 'Fotografer', email: 'bambang@photographer.com', phone: '081211112222', standardFee: 1500000, noRek: 'BCA 1234567890', rewardBalance: 0, rating: 5, performanceNotes: [
      { id: 'PN001', date: createMockDate(-1, 15), type: PerformanceNoteType.PRAISE, note: 'Komunikasi sangat baik dengan klien di proyek Andi & Siska.' },
  ], portalAccessId: 'a1b2c3d4-freelancer-bambang'},
  { id: 'TM002', name: 'Siti Aminah', role: 'Fotografer', email: 'siti@photographer.com', phone: '081233334444', standardFee: 1500000, noRek: 'Mandiri 0987654321', rewardBalance: 0, rating: 4, performanceNotes: [], portalAccessId: 'a1b2c3d4-freelancer-siti' },
  { id: 'TM003', name: 'Rahmat Hidayat', role: 'Videografer', email: 'rahmat@videographer.com', phone: '081255556666', standardFee: 2000000, noRek: 'BRI 1122334455', rewardBalance: 0, rating: 3, performanceNotes: [
      { id: 'PN003', date: createMockDate(-2, 20), type: PerformanceNoteType.LATE_DEADLINE, note: 'Terlambat 2 hari dalam pengiriman file mentah untuk proyek Budi.' },
  ], portalAccessId: 'a1b2c3d4-freelancer-rahmat' },
  { id: 'TM004', name: 'Dewi Anjani', role: 'Editor', email: 'dewi@editor.com', phone: '081277778888', standardFee: 1000000, noRek: 'BCA 9876543210', rewardBalance: 0, rating: 5, performanceNotes: [], portalAccessId: 'a1b2c3d4-freelancer-dewi' },
  { id: 'TM005', name: 'Agung Perkasa', role: 'Videografer', email: 'agung@videographer.com', phone: '081299990000', standardFee: 2000000, noRek: 'BNI 5544332211', rewardBalance: 0, rating: 4, performanceNotes: [], portalAccessId: 'a1b2c3d4-freelancer-agung' },
];

// --- Projects (Define Structure, financial state will be calculated) ---
let projectsData: Project[] = [
    { id: 'PRJ001', projectName: 'Pernikahan Andi & Siska', clientName: 'Andi & Siska', clientId: 'CLI001', projectType: 'Pernikahan', packageName: MOCK_PACKAGES[1].name, packageId: MOCK_PACKAGES[1].id, addOns: [MOCK_ADDONS[1]], date: createMockDate(1, 10), deadlineDate: createMockDate(2, 10), location: 'Hotel Mulia, Jakarta', progress: 75, status: ProjectStatus.EDITING, subStatus: 'Video', totalCost: 27000000, amountPaid: 0, paymentStatus: PaymentStatus.BELUM_BAYAR, team: [{ memberId: 'TM001', name: 'Bambang Sudiro', role: 'Fotografer', fee: 1500000, reward: 200000 }, { memberId: 'TM003', name: 'Rahmat Hidayat', role: 'Videografer', fee: 2000000, reward: 250000 }, { memberId: 'TM004', name: 'Dewi Anjani', role: 'Editor', fee: 1000000, reward: 100000 }], revisions: [{id: 'REV001', date: createMockDate(0, -3), adminNotes: 'Tolong perbaiki tone warna di menit 2:15-2:30, buat lebih warm. Ganti musik latar belakang dengan opsi B yang sudah diberikan di GDrive.', deadline: createMockDate(0, 4), freelancerId: 'TM003', status: RevisionStatus.PENDING,}] },
    { id: 'PRJ002', projectName: 'Prewedding Budi & Rekan', clientName: 'Budi Santoso', clientId: 'CLI002', projectType: 'Pre-wedding', packageName: MOCK_PACKAGES[0].name, packageId: MOCK_PACKAGES[0].id, addOns: [], date: createMockDate(-2, 25), deadlineDate: createMockDate(-1, 25), location: 'Bromo, Jawa Timur', progress: 100, status: ProjectStatus.COMPLETED, totalCost: 15000000, amountPaid: 0, paymentStatus: PaymentStatus.BELUM_BAYAR, team: [{ memberId: 'TM002', name: 'Siti Aminah', role: 'Fotografer', fee: 2000000, reward: 250000 }], finalDriveLink: 'https://example.com/final-budi' },
    { id: 'PRJ003', projectName: 'Lamaran Citra', clientName: 'Citra Lestari', clientId: 'CLI003', projectType: 'Lamaran', packageName: MOCK_PACKAGES[0].name, packageId: MOCK_PACKAGES[0].id, addOns: [], date: createMockDate(-1, 20), deadlineDate: createMockDate(0, 20), location: 'Bandung', progress: 95, status: ProjectStatus.SHIPPED, shippingDetails: 'Flashdisk via JNE AWB123456', totalCost: 15000000, amountPaid: 0, paymentStatus: PaymentStatus.BELUM_BAYAR, team: [{ memberId: 'TM001', name: 'Bambang Sudiro', role: 'Fotografer', fee: 1500000, reward: 150000 }], finalDriveLink: 'https://example.com/final-citra' },
    { id: 'PRJ004', projectName: 'Pernikahan Fajar & Pasangan', clientName: 'Fajar Nugraha', clientId: 'CLI004', projectType: 'Pernikahan', packageName: MOCK_PACKAGES[0].name, packageId: MOCK_PACKAGES[0].id, addOns: [MOCK_ADDONS[3]], date: createMockDate(0, 28), deadlineDate: createMockDate(1, 28), location: 'Gedung Kesenian, Jakarta', progress: 10, status: ProjectStatus.PREPARATION, totalCost: 16000000, amountPaid: 0, paymentStatus: PaymentStatus.BELUM_BAYAR, team: [{ memberId: 'TM005', name: 'Agung Perkasa', role: 'Videografer', fee: 2000000, reward: 200000 }] },
    { id: 'PRJ005', projectName: 'Pernikahan Eko & Pasangan', clientName: 'Eko Prasetyo', clientId: 'CLI005', projectType: 'Pernikahan', packageName: MOCK_PACKAGES[2].name, packageId: MOCK_PACKAGES[2].id, addOns: [MOCK_ADDONS[0], MOCK_ADDONS[1], MOCK_ADDONS[2]], date: createMockDate(2, 15), deadlineDate: createMockDate(3, 15), location: 'Surabaya', progress: 0, status: ProjectStatus.PENDING, totalCost: 46250000, amountPaid: 0, paymentStatus: PaymentStatus.BELUM_BAYAR, team: [] },
];

// --- SINGLE SOURCE OF TRUTH: TRANSACTIONS ---
const baseTransactions: Transaction[] = [
    { id: 'TRN-INIT-001', date: createMockDate(-6, 1), description: 'Modal Awal Usaha', amount: 50000000, type: TransactionType.INCOME, category: 'Modal', method: 'Sistem', cardId: 'CARD001' },
    { id: 'TRN-TFR-001', date: createMockDate(-5, 5), description: 'Setor ke Dana Darurat', amount: 15000000, type: TransactionType.EXPENSE, category: 'Transfer Internal', method: 'Sistem', cardId: 'CARD001', pocketId: 'POC001' },
    { id: 'TRN-TFR-002', date: createMockDate(-5, 6), description: 'Setor ke Beli Kamera Baru', amount: 5000000, type: TransactionType.EXPENSE, category: 'Transfer Internal', method: 'Sistem', cardId: 'CARD001', pocketId: 'POC002' },
    { id: 'TRN-TFR-003', date: createMockDate(-1, 1), description: 'Anggaran Operasional Bulanan', amount: 5000000, type: TransactionType.EXPENSE, category: 'Transfer Internal', method: 'Sistem', cardId: 'CARD001', pocketId: 'POC003' },
    { id: 'TRN-PRJ002-DP', date: createMockDate(-3, 1), description: 'DP Proyek Prewedding Budi', amount: 7500000, type: TransactionType.INCOME, projectId: 'PRJ002', category: 'DP Proyek', method: 'Transfer Bank', cardId: 'CARD001', pocketId: 'POC005' },
    { id: 'TRN-PRJ002-FINAL', date: createMockDate(-2, 20), description: 'Pelunasan Proyek Prewedding Budi', amount: 7500000, type: TransactionType.INCOME, projectId: 'PRJ002', category: 'Pelunasan Proyek', method: 'Transfer Bank', cardId: 'CARD002', pocketId: 'POC005' },
    { id: 'TRN-PRJ002-FEE', date: createMockDate(-2, 22), description: 'Gaji Freelancer Siti Aminah - Proyek Budi', amount: 2000000, type: TransactionType.EXPENSE, projectId: 'PRJ002', category: 'Gaji Freelancer', method: 'Transfer Bank', cardId: 'CARD001' },
    { id: 'TRN-PRJ002-RWD', date: createMockDate(-2, 22), description: 'Hadiah untuk Siti Aminah (Proyek: Prewedding Budi & Rekan)', amount: 250000, type: TransactionType.EXPENSE, category: 'Hadiah Freelancer', method: 'Sistem' },
    { id: 'TRN-PRJ002-COST', date: createMockDate(-2, 23), description: 'Transportasi & Akomodasi Bromo', amount: 2500000, type: TransactionType.EXPENSE, projectId: 'PRJ002', category: 'Transportasi', method: 'Tunai', cardId: 'CARD_CASH' },
    { id: 'TRN-PRJ003-FULL', date: createMockDate(-2, 1), description: 'Pelunasan Proyek Lamaran Citra', amount: 15000000, type: TransactionType.INCOME, projectId: 'PRJ003', category: 'Pelunasan Proyek', method: 'Transfer Bank', cardId: 'CARD001', pocketId: 'POC005' },
    { id: 'TRN-PRJ003-FEE', date: createMockDate(-1, 22), description: 'Gaji Freelancer Bambang Sudiro - Proyek Citra', amount: 1500000, type: TransactionType.EXPENSE, projectId: 'PRJ003', category: 'Gaji Freelancer', method: 'Transfer Bank', cardId: 'CARD001' },
    { id: 'TRN-PRJ003-RWD', date: createMockDate(-1, 22), description: 'Hadiah untuk Bambang Sudiro (Proyek: Lamaran Citra)', amount: 150000, type: TransactionType.EXPENSE, category: 'Hadiah Freelancer', method: 'Sistem' },
    { id: 'TRN-PRJ001-DP', date: createMockDate(-1, 20), description: 'DP Proyek Pernikahan Andi & Siska', amount: 10000000, type: TransactionType.INCOME, projectId: 'PRJ001', category: 'DP Proyek', method: 'Transfer Bank', cardId: 'CARD002', pocketId: 'POC005' },
    { id: 'TRN-PRJ001-RWD-A', date: createMockDate(-1, 20), description: 'Hadiah untuk Bambang Sudiro (Proyek: Pernikahan Andi & Siska)', amount: 200000, type: TransactionType.EXPENSE, category: 'Hadiah Freelancer', method: 'Sistem' },
    { id: 'TRN-PRJ001-RWD-B', date: createMockDate(-1, 20), description: 'Hadiah untuk Rahmat Hidayat (Proyek: Pernikahan Andi & Siska)', amount: 250000, type: TransactionType.EXPENSE, category: 'Hadiah Freelancer', method: 'Sistem' },
    { id: 'TRN-PRJ004-DP', date: createMockDate(0, -1), description: 'DP Proyek Pernikahan Fajar & Pasangan', amount: 8000000, type: TransactionType.INCOME, projectId: 'PRJ004', category: 'DP Proyek', method: 'Transfer Bank', cardId: 'CARD001', pocketId: 'POC005' },
    { id: 'TRN-PRJ004-RWD', date: createMockDate(0, -1), description: 'Hadiah untuk Agung Perkasa (Proyek: Pernikahan Fajar & Pasangan)', amount: 200000, type: TransactionType.EXPENSE, category: 'Hadiah Freelancer', method: 'Sistem' },
    { id: 'TRN-GEN-001', date: createMockDate(0, -15), description: 'Biaya Iklan Instagram', amount: 500000, type: TransactionType.EXPENSE, category: 'Marketing', method: 'Kartu', cardId: 'CARD003' },
    { id: 'TRN-GEN-002', date: createMockDate(0, -10), description: 'Pembelian ATK Kantor', amount: 750000, type: TransactionType.EXPENSE, category: 'Operasional Kantor', method: 'Sistem', pocketId: 'POC003' },
    { id: 'TRN-RWD-WTH-BAMBANG', date: createMockDate(0, -5), description: 'Penarikan saldo hadiah oleh Bambang Sudiro', amount: 150000, type: TransactionType.EXPENSE, category: 'Penarikan Hadiah Freelancer', method: 'Transfer Bank', cardId: 'CARD001' },
];

// --- DERIVED DATA (Calculated from transactions for consistency) ---
// Note: This logic would typically be on a backend. We simulate it here for mock data integrity.

projectsData = projectsData.map(p => {
    const amountPaid = baseTransactions
        .filter(t => t.projectId === p.id && t.type === TransactionType.INCOME)
        .reduce((sum, t) => sum + t.amount, 0);
    let paymentStatus = PaymentStatus.BELUM_BAYAR;
    if (amountPaid > 0) paymentStatus = amountPaid >= p.totalCost ? PaymentStatus.LUNAS : PaymentStatus.DP_TERBAYAR;
    return { ...p, amountPaid, paymentStatus };
});

export const MOCK_REWARD_LEDGER_ENTRIES: RewardLedgerEntry[] = baseTransactions
    .filter(t => t.category === 'Hadiah Freelancer' || t.category === 'Penarikan Hadiah Freelancer')
    .map(t => {
        let memberId = '';
        if (t.category === 'Hadiah Freelancer') {
            const teamMemberName = t.description.match(/untuk (.*?)( |\(|$)/)?.[1];
            const member = teamMembersData.find(m => m.name.includes(teamMemberName || ''));
            if (member) memberId = member.id;
        } else {
            const teamMemberName = t.description.match(/oleh (.*?)$/)?.[1];
            const member = teamMembersData.find(m => m.name === teamMemberName);
            if (member) memberId = member.id;
        }
        return {
            id: `RLE-${t.id}`,
            teamMemberId: memberId, date: t.date, description: t.description,
            amount: t.category === 'Penarikan Hadiah Freelancer' ? -t.amount : t.amount,
        };
    })
    .filter(e => e.teamMemberId)
    .sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());

teamMembersData.forEach(member => {
    member.rewardBalance = MOCK_REWARD_LEDGER_ENTRIES
        .filter(e => e.teamMemberId === member.id)
        .reduce((sum, e) => sum + e.amount, 0);
});

let cardsData: Card[] = [
  { id: 'CARD001', cardHolderName: 'Nama Pengguna', bankName: 'WBank', cardType: CardType.PRABAYAR, lastFourDigits: '3090', expiryDate: '09/24', balance: 0, colorGradient: 'from-purple-500 to-indigo-600' },
  { id: 'CARD002', cardHolderName: 'Nama Pengguna', bankName: 'WBank', cardType: CardType.PRABAYAR, lastFourDigits: '9800', expiryDate: '04/26', balance: 0, colorGradient: 'from-blue-500 to-cyan-500' },
  { id: 'CARD003', cardHolderName: 'Nama Pengguna', bankName: 'VISA', cardType: CardType.KREDIT, lastFourDigits: '0032', expiryDate: '09/24', balance: 0, colorGradient: 'from-slate-100 to-slate-300' },
  { id: 'CARD_CASH', cardHolderName: 'Uang Tunai', bankName: 'Tunai', cardType: CardType.DEBIT, lastFourDigits: 'CASH', balance: 0, colorGradient: 'from-emerald-500 to-green-600' },
];

cardsData.forEach(card => {
    card.balance = baseTransactions.reduce((sum, t) => {
        if (t.cardId === card.id) {
            if (t.type === TransactionType.INCOME) return sum + t.amount;
            if (t.type === TransactionType.EXPENSE) return sum - t.amount;
        }
        return sum;
    }, 0);
});

let pocketsData: FinancialPocket[] = [
    { id: 'POC001', name: 'Dana Darurat', description: 'Untuk keperluan tak terduga', icon: 'piggy-bank', type: PocketType.SAVING, amount: 0, goalAmount: 50000000, sourceCardId: 'CARD001' },
    { id: 'POC002', name: 'Beli Kamera Baru', description: 'Upgrade ke Sony A7IV', icon: 'lock', type: PocketType.LOCKED, amount: 0, goalAmount: 35000000, lockEndDate: createMockDate(6, 1), sourceCardId: 'CARD001' },
    { id: 'POC003', name: `Anggaran Operasional ${new Date().toLocaleString('id-ID', {month: 'long', year: 'numeric'})}`, description: 'Budget untuk pengeluaran rutin', icon: 'clipboard-list', type: PocketType.EXPENSE, amount: 0, goalAmount: 5000000, sourceCardId: 'CARD001' },
    { id: 'POC005', name: 'Pemasukan dari Klien', description: 'Kantong untuk melacak total pemasukan.', icon: 'piggy-bank', type: PocketType.SAVING, amount: 0 },
    { id: 'POC_REWARD', name: 'Tabungan Hadiah Freelancer', description: 'Total saldo hadiah semua freelancer.', icon: 'star', type: PocketType.REWARD_POOL, amount: 0 },
];

pocketsData.forEach(pocket => {
    pocket.amount = baseTransactions.reduce((sum, t) => {
        if (t.pocketId === pocket.id) {
            if (t.description.startsWith('Setor ke') || t.description.startsWith('DP Proyek') || t.description.startsWith('Pelunasan Proyek')) return sum + t.amount;
            return sum - t.amount;
        }
        return sum;
    }, 0);
});
pocketsData.find(p => p.type === PocketType.REWARD_POOL)!.amount = teamMembersData.reduce((sum, m) => sum + m.rewardBalance, 0);


let teamProjectPaymentsData: TeamProjectPayment[] = projectsData.flatMap(p => 
    p.team.map(t => ({
        id: `TPP-${p.id}-${t.memberId}`, projectId: p.id, teamMemberName: t.name, teamMemberId: t.memberId, date: p.date,
        status: 'Unpaid', fee: t.fee, reward: t.reward || 0,
    }))
);
baseTransactions.filter(t => t.category === 'Gaji Freelancer').forEach(t => {
    const memberName = t.description.split(' - ')[0].replace('Gaji Freelancer ', '');
    const projectName = t.description.split(' - ')[1].replace('Proyek ', '');
    const project = projectsData.find(p => p.projectName === projectName);
    const member = teamMembersData.find(m => m.name === memberName);
    if (project && member) {
        const paymentEntry = teamProjectPaymentsData.find(p => p.projectId === project.id && p.teamMemberId === member.id);
        if (paymentEntry) paymentEntry.status = 'Paid';
    }
});

// --- Final Exports ---
export const MOCK_PROJECTS = projectsData;
export const MOCK_TRANSACTIONS = baseTransactions.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
export const MOCK_CARDS = cardsData;
export const MOCK_FINANCIAL_POCKETS = pocketsData;
export const MOCK_TEAM_PROJECT_PAYMENTS = teamProjectPaymentsData;
export const MOCK_TEAM_MEMBERS = teamMembersData;

export const MOCK_TEAM_PAYMENT_RECORDS: TeamPaymentRecord[] = [
    { id: 'TPR001', recordNumber: 'PAY-FR-TM002-1234', teamMemberId: 'TM002', date: createMockDate(-2, 22), projectPaymentIds: ['TPP-PRJ002-TM002'], totalAmount: 2000000 },
    { id: 'TPR002', recordNumber: 'PAY-FR-TM001-5678', teamMemberId: 'TM001', date: createMockDate(-1, 22), projectPaymentIds: ['TPP-PRJ003-TM001'], totalAmount: 1500000 },
];

export const MOCK_ASSETS: Asset[] = [
    { id: 'ASSET001', name: 'Sony Alpha 7 IV', category: 'Kamera', purchaseDate: createMockDate(-12, 5), purchasePrice: 38000000, serialNumber: 'SN12345678', status: AssetStatus.AVAILABLE },
    { id: 'ASSET002', name: 'Sony FE 24-70mm f/2.8 GM II', category: 'Lensa', purchaseDate: createMockDate(-12, 5), purchasePrice: 32000000, serialNumber: 'SN98765432', status: AssetStatus.AVAILABLE },
    { id: 'ASSET003', name: 'DJI Mavic 3 Pro', category: 'Drone', purchaseDate: createMockDate(-6, 15), purchasePrice: 30000000, serialNumber: 'SNDRONE01', status: AssetStatus.IN_USE, notes: 'Digunakan untuk proyek Andi & Siska' },
    { id: 'ASSET004', name: 'Godox AD200 Pro', category: 'Lighting', purchaseDate: createMockDate(-24, 1), purchasePrice: 5000000, status: AssetStatus.AVAILABLE },
    { id: 'ASSET005', name: 'Canon EOS R5', category: 'Kamera', purchaseDate: createMockDate(-3, 20), purchasePrice: 60000000, serialNumber: 'SNCANONR5', status: AssetStatus.MAINTENANCE, notes: 'Sensor perlu dibersihkan.' },
];

export const MOCK_CONTRACTS: Contract[] = [
    {
        id: 'CTR001',
        contractNumber: 'VP/CTR/2024/001',
        clientId: 'CLI001',
        projectId: 'PRJ001',
        signingDate: createMockDate(0, -15),
        signingLocation: 'Kantor Vena Pictures',
        clientName1: 'Andi',
        clientAddress1: 'Jl. Bahagia No. 1, Jakarta',
        clientPhone1: '081111111111',
        clientName2: 'Siska',
        clientAddress2: 'Jl. Bahagia No. 1, Jakarta',
        clientPhone2: '081111111111',
        shootingDuration: '10 Jam Liputan',
        guaranteedPhotos: 'Minimum 500 foto high-res',
        albumDetails: '1 Album Cetak Premium 20x30cm 20 halaman',
        digitalFilesFormat: 'JPG High-Resolution & All Raw Files',
        otherItems: 'Sewa Drone',
        personnelCount: '2 Fotografer, 2 Videografer, 1 Asisten',
        deliveryTimeframe: '45 hari kerja',
        dpDate: createMockDate(-1, 20),
        finalPaymentDate: createMockDate(1, 3), // H-7 before event
        cancellationPolicy: "DP yang sudah dibayarkan tidak dapat dikembalikan. Jika pembatalan dilakukan H-14 sebelum hari pelaksanaan, PIHAK KEDUA wajib membayar 50% dari total biaya.",
        jurisdiction: 'Jakarta Selatan',
        createdAt: createMockDate(0, -15),
    }
];

export const MOCK_CLIENT_FEEDBACK: ClientFeedback[] = [
    { 
        id: 'FB001', 
        clientName: 'Budi Santoso', 
        satisfaction: SatisfactionLevel.VERY_SATISFIED,
        rating: 5, 
        feedback: 'Tim sangat profesional dan hasilnya luar biasa! Sangat puas dengan pelayanan Vena Pictures.',
        date: createMockDate(-1, 28) 
    },
    { 
        id: 'FB002', 
        clientName: 'Citra Lestari', 
        satisfaction: SatisfactionLevel.SATISFIED,
        rating: 4, 
        feedback: 'Secara keseluruhan bagus, komunikasinya lancar. Hasilnya juga memuaskan.',
        date: createMockDate(0, -5)
    },
];

export const MOCK_FREELANCER_FEEDBACK: FreelancerFeedback[] = [];

export const MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: 'NOTIF001',
        title: 'Revisi Tertunda',
        message: 'Rahmat Hidayat belum menyelesaikan revisi untuk proyek "Andi & Siska".',
        timestamp: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
        isRead: false,
        icon: 'revision',
        link: { view: ViewType.PROJECTS, action: { type: 'VIEW_PROJECT_DETAILS', id: 'PRJ001' }}
    },
    {
        id: 'NOTIF002',
        title: 'Deadline Mendekat',
        message: 'Proyek "Pernikahan Fajar & Pasangan" akan segera mencapai deadline.',
        timestamp: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
        isRead: false,
        icon: 'deadline',
        link: { view: ViewType.PROJECTS, action: { type: 'VIEW_PROJECT_DETAILS', id: 'PRJ004' }}
    },
    {
        id: 'NOTIF003',
        title: 'Prospek Baru Masuk',
        message: 'Gita Permata dari WhatsApp, lokasi di Bandung.',
        timestamp: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
        isRead: true,
        icon: 'lead',
        link: { view: ViewType.PROSPEK, action: { type: 'VIEW_LEAD', id: 'LEAD002' }}
    },
     {
        id: 'NOTIF004',
        title: 'Pembayaran Belum Lunas',
        message: 'Pelunasan untuk proyek "Pernikahan Andi & Siska" belum diterima.',
        timestamp: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString(),
        isRead: true,
        icon: 'payment',
        link: { view: ViewType.CLIENTS, action: { type: 'VIEW_CLIENT_DETAILS', id: 'CLI001' }}
    }
];

export const MOCK_SOCIAL_MEDIA_POSTS: SocialMediaPost[] = [
    {
        id: 'SMP001',
        projectId: 'PRJ001',
        clientName: 'Andi & Siska',
        postType: PostType.INSTAGRAM_REELS,
        platform: 'Instagram',
        scheduledDate: createMockDate(0, 7), // A week from now
        caption: 'Momen magis dari pernikahan Andi & Siska! ✨ Tonton sampai habis untuk melihat kejutan manisnya. #weddingreels #pernikahanimpian #venapictures',
        mediaUrl: 'https://example.com/reels/andi_siska.mp4',
        status: PostStatus.SCHEDULED,
        notes: 'Pastikan musiknya sudah approved. Gunakan lagu "Perfect - Ed Sheeran".'
    },
    {
        id: 'SMP002',
        projectId: 'PRJ002',
        clientName: 'Budi Santoso',
        postType: PostType.INSTAGRAM_FEED,
        platform: 'Instagram',
        scheduledDate: createMockDate(0, 3), // 3 days from now
        caption: 'Menjelajahi keindahan Bromo bersama Budi & Rekan. Setiap sudutnya adalah puisi. 🌄 #preweddingbromo #venapictures #exploreindonesia',
        mediaUrl: 'https://example.com/feed/budi_bromo.jpg',
        status: PostStatus.SCHEDULED,
    },
    {
        id: 'SMP003',
        projectId: 'PRJ003',
        clientName: 'Citra Lestari',
        postType: PostType.INSTAGRAM_STORY,
        platform: 'Instagram',
        scheduledDate: createMockDate(0, 1), // Tomorrow
        caption: 'Behind the scenes lamaran Citra! Geser untuk lihat lebih banyak ->',
        status: PostStatus.DRAFT,
        notes: 'Buat polling "Tim lamaran siapa nih?". Tambahkan stiker countdown.'
    },
    {
        id: 'SMP004',
        projectId: 'PRJ004',
        clientName: 'Fajar Nugraha',
        postType: PostType.TIKTOK,
        platform: 'TikTok',
        scheduledDate: createMockDate(0, 10), // 10 days from now
        caption: 'GRWM versi vendor! Persiapan tim Vena Pictures untuk hari besar Fajar & Pasangan. #weddingvendor #behindthescenes #fotograferpernikahan',
        status: PostStatus.DRAFT,
    },
     {
        id: 'SMP005',
        projectId: 'PRJ002',
        clientName: 'Budi Santoso',
        postType: PostType.BLOG,
        platform: 'Website',
        scheduledDate: createMockDate(-1, 0), // Last month
        caption: '5 Tips Pre-wedding di Bromo: Panduan Lengkap dari Pengalaman Kami',
        mediaUrl: 'https://example.com/blog/tips_bromo.html',
        status: PostStatus.POSTED,
    }
];