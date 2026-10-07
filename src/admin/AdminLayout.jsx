import { useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Users, LogOut, Settings } from 'lucide-react';
import './Admin.css';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (!token) {
            navigate('/admin/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        navigate('/admin/login');
    };

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-brand">
                    <h2>NM Admin</h2>
                </div>
                <nav className="admin-nav">
                    <Link to="/admin/dashboard" className={location.pathname === '/admin/dashboard' ? 'active' : ''}>
                        <LayoutDashboard size={20} /> Dashboard
                    </Link>
                    <Link to="/admin/projects" className={location.pathname.startsWith('/admin/projects') ? 'active' : ''}>
                        <FolderKanban size={20} /> Projects
                    </Link>
                    <Link to="/admin/leads" className={location.pathname.startsWith('/admin/leads') ? 'active' : ''}>
                        <Users size={20} /> Leads
                    </Link>
                    <Link to="/admin/settings" className={location.pathname.startsWith('/admin/settings') ? 'active' : ''}>
                        <Settings size={20} /> Settings
                    </Link>
                </nav>
                <div className="admin-bottom-nav">
                    <button onClick={handleLogout} className="logout-btn">
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </aside>
            <main className="admin-main">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
