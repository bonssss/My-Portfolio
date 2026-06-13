import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, X } from "lucide-react";

export function ManageExperience() {
  const [experience, setExperience] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  
  // Form State
  const [id, setId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [period, setPeriod] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");

  const fetchExperience = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('experience').select('*').order('created_at', { ascending: false });
    if (error) {
      toast.error(error.message);
    } else {
      setExperience(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  const resetForm = () => {
    setId(null);
    setTitle("");
    setCompany("");
    setPeriod("");
    setDescription("");
    setIcon("");
    setIsEditing(false);
  };

  const handleEdit = (exp: any) => {
    setId(exp.id);
    setTitle(exp.title);
    setCompany(exp.company);
    setPeriod(exp.period);
    setDescription(exp.description);
    setIcon(exp.icon);
    setIsEditing(true);
  };

  const handleDelete = async (expId: number) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;
    
    const { error } = await supabase.from('experience').delete().eq('id', expId);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Experience deleted");
      fetchExperience();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      title,
      company,
      period,
      description,
      icon
    };

    if (id) {
      const { error } = await supabase.from('experience').update(payload).eq('id', id);
      if (error) toast.error(error.message);
      else toast.success("Experience updated");
    } else {
      const { error } = await supabase.from('experience').insert([payload]);
      if (error) toast.error(error.message);
      else toast.success("Experience added");
    }

    resetForm();
    fetchExperience();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Manage Experience</h1>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>
            <Plus className="w-4 h-4 mr-2" /> Add Experience
          </Button>
        )}
      </div>

      {isEditing && (
        <div className="p-6 border rounded-xl bg-card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{id ? "Edit Experience" : "New Experience"}</h2>
            <Button variant="ghost" size="icon" onClick={resetForm}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input id="title" value={title} onChange={e => setTitle(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" value={company} onChange={e => setCompany(e.target.value)} required />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="period">Period (e.g. 2022 - Present)</Label>
                <Input id="period" value={period} onChange={e => setPeriod(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="icon">Lucide Icon Name</Label>
                <Input id="icon" value={icon} onChange={e => setIcon(e.target.value)} placeholder="ShieldCheck" required />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" value={description} onChange={e => setDescription(e.target.value)} required />
            </div>

            <Button type="submit" className="w-full">{id ? "Update Experience" : "Save Experience"}</Button>
          </form>
        </div>
      )}

      <div className="border rounded-xl bg-card overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
            <tr>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Company</th>
              <th className="px-6 py-3">Period</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center">Loading experience...</td>
              </tr>
            ) : experience.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center">No experience entries found.</td>
              </tr>
            ) : experience.map((exp) => (
              <tr key={exp.id} className="border-b border-border hover:bg-muted/50">
                <td className="px-6 py-4 font-medium">{exp.title}</td>
                <td className="px-6 py-4">{exp.company}</td>
                <td className="px-6 py-4 text-muted-foreground">{exp.period}</td>
                <td className="px-6 py-4 text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(exp)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(exp.id)}>
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
