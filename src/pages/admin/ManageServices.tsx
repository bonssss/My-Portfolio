import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, X } from "lucide-react";

export function ManageServices() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  
  // Form State
  const [id, setId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");

  const fetchServices = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('services').select('*').order('created_at', { ascending: false });
    if (error) {
      toast.error(error.message);
    } else {
      setServices(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const resetForm = () => {
    setId(null);
    setTitle("");
    setDescription("");
    setIcon("");
    setIsEditing(false);
  };

  const handleEdit = (service: any) => {
    setId(service.id);
    setTitle(service.title);
    setDescription(service.description);
    setIcon(service.icon);
    setIsEditing(true);
  };

  const handleDelete = async (serviceId: number) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    
    const { error } = await supabase.from('services').delete().eq('id', serviceId);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Service deleted");
      fetchServices();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      title,
      description,
      icon
    };

    if (id) {
      const { error } = await supabase.from('services').update(payload).eq('id', id);
      if (error) toast.error(error.message);
      else toast.success("Service updated");
    } else {
      const { error } = await supabase.from('services').insert([payload]);
      if (error) toast.error(error.message);
      else toast.success("Service added");
    }

    resetForm();
    fetchServices();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Manage Services</h1>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>
            <Plus className="w-4 h-4 mr-2" /> Add Service
          </Button>
        )}
      </div>

      {isEditing && (
        <div className="p-6 border rounded-xl bg-card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{id ? "Edit Service" : "New Service"}</h2>
            <Button variant="ghost" size="icon" onClick={resetForm}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Service Title</Label>
                <Input id="title" value={title} onChange={e => setTitle(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="icon">Lucide Icon Name</Label>
                <Input id="icon" value={icon} onChange={e => setIcon(e.target.value)} placeholder="Cpu" required />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" value={description} onChange={e => setDescription(e.target.value)} required />
            </div>

            <Button type="submit" className="w-full">{id ? "Update Service" : "Save Service"}</Button>
          </form>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {loading ? (
          <div className="col-span-full text-center py-8">Loading services...</div>
        ) : services.length === 0 ? (
          <div className="col-span-full text-center py-8">No services found.</div>
        ) : services.map((service) => (
          <div key={service.id} className="border rounded-xl bg-card p-6 relative group">
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleEdit(service)}>
                <Pencil className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8 text-destructive border-destructive/50" onClick={() => handleDelete(service.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
            <p className="text-sm text-muted-foreground">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
