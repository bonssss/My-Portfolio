import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, X } from "lucide-react";

export function ManageProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  
  // Form State
  const [id, setId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tech, setTech] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [github, setGithub] = useState("");
  const [demo, setDemo] = useState("");

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (error) {
      toast.error(error.message);
    } else {
      setProjects(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const resetForm = () => {
    setId(null);
    setTitle("");
    setDescription("");
    setTech("");
    setImage("");
    setCategory("");
    setGithub("");
    setDemo("");
    setIsEditing(false);
  };

  const handleEdit = (project: any) => {
    setId(project.id);
    setTitle(project.title);
    setDescription(project.description);
    setTech(project.tech.join(", "));
    setImage(project.image);
    setCategory(project.category);
    setGithub(project.github || "");
    setDemo(project.demo || "");
    setIsEditing(true);
  };

  const handleDelete = async (projectId: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    
    const { error } = await supabase.from('projects').delete().eq('id', projectId);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Project deleted");
      fetchProjects();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const techArray = tech.split(",").map(t => t.trim()).filter(t => t !== "");
    
    const payload = {
      title,
      description,
      tech: techArray,
      image,
      category,
      github,
      demo
    };

    if (id) {
      const { error } = await supabase.from('projects').update(payload).eq('id', id);
      if (error) toast.error(error.message);
      else toast.success("Project updated");
    } else {
      const { error } = await supabase.from('projects').insert([payload]);
      if (error) toast.error(error.message);
      else toast.success("Project added");
    }

    resetForm();
    fetchProjects();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Manage Projects</h1>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>
            <Plus className="w-4 h-4 mr-2" /> Add Project
          </Button>
        )}
      </div>

      {isEditing && (
        <div className="p-6 border rounded-xl bg-card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{id ? "Edit Project" : "New Project"}</h2>
            <Button variant="ghost" size="icon" onClick={resetForm}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={title} onChange={e => setTitle(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" value={category} onChange={e => setCategory(e.target.value)} required />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" value={description} onChange={e => setDescription(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tech">Technologies (comma separated)</Label>
              <Input id="tech" value={tech} onChange={e => setTech(e.target.value)} placeholder="React, Node.js, Postgres" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input id="image" value={image} onChange={e => setImage(e.target.value)} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="github">GitHub URL (Optional)</Label>
                <Input id="github" value={github} onChange={e => setGithub(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="demo">Live Demo URL (Optional)</Label>
                <Input id="demo" value={demo} onChange={e => setDemo(e.target.value)} />
              </div>
            </div>

            <Button type="submit" className="w-full">{id ? "Update Project" : "Save Project"}</Button>
          </form>
        </div>
      )}

      <div className="border rounded-xl bg-card overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
            <tr>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center">Loading projects...</td>
              </tr>
            ) : projects.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center">No projects found. Add one above!</td>
              </tr>
            ) : projects.map((project) => (
              <tr key={project.id} className="border-b border-border hover:bg-muted/50">
                <td className="px-6 py-4">
                  <img src={project.image} alt={project.title} className="w-16 h-16 object-cover rounded-md" />
                </td>
                <td className="px-6 py-4 font-medium">{project.title}</td>
                <td className="px-6 py-4">{project.category}</td>
                <td className="px-6 py-4 text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(project)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(project.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
