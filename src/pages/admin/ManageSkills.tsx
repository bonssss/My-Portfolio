import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, X } from "lucide-react";

export function ManageSkills() {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  
  // Form State
  const [id, setId] = useState<number | null>(null);
  const [category, setCategory] = useState("");
  const [icon, setIcon] = useState("");
  const [items, setItems] = useState("");

  const fetchSkills = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('skills').select('*').order('created_at', { ascending: false });
    if (error) {
      toast.error(error.message);
    } else {
      setSkills(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const resetForm = () => {
    setId(null);
    setCategory("");
    setIcon("");
    setItems("");
    setIsEditing(false);
  };

  const handleEdit = (skill: any) => {
    setId(skill.id);
    setCategory(skill.category);
    setIcon(skill.icon);
    setItems(skill.items.join(", "));
    setIsEditing(true);
  };

  const handleDelete = async (skillId: number) => {
    if (!confirm("Are you sure you want to delete this skill category?")) return;
    
    const { error } = await supabase.from('skills').delete().eq('id', skillId);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Skill category deleted");
      fetchSkills();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const itemsArray = items.split(",").map(t => t.trim()).filter(t => t !== "");
    
    const payload = {
      category,
      icon,
      items: itemsArray
    };

    if (id) {
      const { error } = await supabase.from('skills').update(payload).eq('id', id);
      if (error) toast.error(error.message);
      else toast.success("Skill category updated");
    } else {
      const { error } = await supabase.from('skills').insert([payload]);
      if (error) toast.error(error.message);
      else toast.success("Skill category added");
    }

    resetForm();
    fetchSkills();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Manage Skills</h1>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>
            <Plus className="w-4 h-4 mr-2" /> Add Skill Category
          </Button>
        )}
      </div>

      {isEditing && (
        <div className="p-6 border rounded-xl bg-card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{id ? "Edit Category" : "New Category"}</h2>
            <Button variant="ghost" size="icon" onClick={resetForm}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category Name</Label>
                <Input id="category" value={category} onChange={e => setCategory(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="icon">Lucide Icon Name</Label>
                <Input id="icon" value={icon} onChange={e => setIcon(e.target.value)} placeholder="Server" required />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="items">Skills (comma separated)</Label>
              <Input id="items" value={items} onChange={e => setItems(e.target.value)} placeholder="React, Node.js, Postgres" required />
            </div>

            <Button type="submit" className="w-full">{id ? "Update Category" : "Save Category"}</Button>
          </form>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full text-center py-8">Loading skills...</div>
        ) : skills.length === 0 ? (
          <div className="col-span-full text-center py-8">No skills found.</div>
        ) : skills.map((skill) => (
          <div key={skill.id} className="border rounded-xl bg-card p-6 relative group">
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleEdit(skill)}>
                <Pencil className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8 text-destructive border-destructive/50" onClick={() => handleDelete(skill.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <h3 className="font-semibold text-lg mb-4">{skill.category}</h3>
            <div className="flex flex-wrap gap-2">
              {skill.items.map((item: string, i: number) => (
                <span key={i} className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-md">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
