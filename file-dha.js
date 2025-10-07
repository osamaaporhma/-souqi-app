/* ========== إدارة المشاريع ========== */

class ProjectManager {
    constructor() {
        this.projects = this.loadProjects();
        this.currentProject = null;
    }

    // تحميل المشاريع من التخزين المحلي
    loadProjects() {
        const stored = localStorage.getItem('projects');
        return stored ? JSON.parse(stored) : [];
    }

    // حفظ المشاريع في التخزين المحلي
    saveProjects() {
        localStorage.setItem('projects', JSON.stringify(this.projects));
    }

    // إنشاء مشروع جديد
    createProject(projectData) {
        const project = {
            id: this.generateId(),
            ...projectData,
            progress: 0,
            currentPhase: 'design',
            pages: [
                {
                    id: this.generateId(),
                    name: 'الرئيسية',
                    route: '/',
                    components: []
                }
            ],
            models: [],
            apis: [],
            assets: [],
            styles: {
                colors: {
                    primary: '#6366f1',
                    secondary: '#8b5cf6',
                    success: '#10b981',
                    warning: '#f59e0b',
                    danger: '#ef4444'
                },
                fonts: {
                    primary: 'Arial, sans-serif',
                    heading: 'Georgia, serif'
                }
            },
            deployed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.projects.push(project);
        this.saveProjects();
        return project;
    }

    // الحصول على مشروع
    getProject(projectId) {
        return this.projects.find(p => p.id === projectId);
    }

    // تحديث مشروع
    updateProject(projectId, updates) {
        const index = this.projects.findIndex(p => p.id === projectId);
        if (index === -1) return null;

        this.projects[index] = {
            ...this.projects[index],
            ...updates,
            updatedAt: new Date().toISOString()
        };

        this.saveProjects();
        return this.projects[index];
    }

    // حذف مشروع
    deleteProject(projectId) {
        this.projects = this.projects.filter(p => p.id !== projectId);
        this.saveProjects();
    }

    // إضافة صفحة للمشروع
    addPage(projectId, pageName) {
        const project = this.getProject(projectId);
        if (!project) return null;

        const page = {
            id: this.generateId(),
            name: pageName,
            route: '/' + pageName.toLowerCase().replace(/\s+/g, '-'),
            components: []
        };

        project.pages.push(page);
        this.updateProject(projectId, project);
        return page;
    }

    // حذف صفحة من المشروع
    deletePage(projectId, pageId) {
        const project = this.getProject(projectId);
        if (!project) return false;

        project.pages = project.pages.filter(p => p.id !== pageId);
        this.updateProject(projectId, project);
        return true;
    }

 