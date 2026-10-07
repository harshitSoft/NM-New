import { useState, useEffect } from 'react';
import api from '../api/axios';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalProjects: 0,
        totalLeads: 0
    });

    useEffect(() => {
        // Fetch stats placeholder
        // Normally we'd call an admin endpoint for stats
        const fetchStats = async () => {
            try {
                const projRes = await api.get('/public/projects');
                setStats(s => ({...s, totalProjects: projRes.data?.data?.length || 0}));
            } catch (error) {
                console.error(error);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="admin-dashboard">
            <h1 style={{marginBottom: '2rem'}}>Dashboard</h1>
            <div className="stats-grid">
                <div className="admin-stat-card">
                    <h3>Total Projects</h3>
                    <p className="stat-value">{stats.totalProjects}</p>
                </div>
                <div className="admin-stat-card">
                    <h3>Total Leads</h3>
                    <p className="stat-value">{stats.totalLeads}</p>
                </div>
                <div className="admin-stat-card">
                    <h3>New Enquiries</h3>
                    <p className="stat-value">0</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
