import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderGit2, Briefcase, Wrench, Settings } from "lucide-react";

export function Dashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    experience: 0,
    skills: 0,
    services: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [projects, exp, skills, services] = await Promise.all([
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('experience').select('*', { count: 'exact', head: true }),
        supabase.from('skills').select('*', { count: 'exact', head: true }),
        supabase.from('services').select('*', { count: 'exact', head: true }),
      ]);

      setStats({
        projects: projects.count || 0,
        experience: exp.count || 0,
        skills: skills.count || 0,
        services: services.count || 0,
      });
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: "Total Projects", value: stats.projects, icon: FolderGit2, color: "text-blue-500" },
    { title: "Experience Entries", value: stats.experience, icon: Briefcase, color: "text-green-500" },
    { title: "Skill Categories", value: stats.skills, icon: Wrench, color: "text-orange-500" },
    { title: "Services Offered", value: stats.services, icon: Settings, color: "text-purple-500" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, i) => (
          <div key={i} className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">{stat.title}</h3>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
