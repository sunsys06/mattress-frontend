'use client';

import { useEffect, useState } from 'react';
import {
  Globe, Search, Share2, BarChart2, FileText,
  Save, RefreshCw, CheckCircle, ChevronRight,
  Eye, EyeOff, Home, Info, Package, Phone, ShoppingCart, CreditCard,
  Box,
} from 'lucide-react';

// ── Types ────────────────────────────────────────────────────────────────────

type GlobalSeo = {
  seo_site_name: string; seo_tagline: string; seo_title_template: string;
  seo_default_description: string; seo_default_keywords: string;
  seo_og_image: string; seo_canonical_url: string;
  seo_google_analytics_id: string; seo_google_site_verification: string;
  seo_robots_txt: string;
  social_facebook: string; social_instagram: string; social_twitter: string;
  social_youtube: string; social_whatsapp: string;
};

type PageSeo = {
  id: string; pageSlug: string; pageLabel: string;
  title: string | null; description: string | null; keywords: string | null;
  ogTitle: string | null; ogDescription: string | null; ogImage: string | null;
  robotsIndex: boolean; robotsFollow: boolean; canonicalUrl: string | null;
};

const PAGE_ICONS: Record<string, React.ReactNode> = {
  home:     <Home className="w-4 h-4" />,
  about:    <Info className="w-4 h-4" />,
  products: <Package className="w-4 h-4" />,
  contact:  <Phone className="w-4 h-4" />,
  cart:     <ShoppingCart className="w-4 h-4" />,
  checkout: <CreditCard className="w-4 h-4" />,
};

const CHAR_DESC = 160;
const input = 'w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300';

// ── Main Component ────────────────────────────────────────────────────────────

export default function SeoPage() {
  const [tab, setTab] = useState<'global' | 'pages' | 'products'>('global');
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-800">SEO Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage SEO for your entire site, individual pages, and products</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
        {([
          ['global',   'Global SEO'],
          ['pages',    'Page SEO'],
          ['products', 'Products SEO'],
        ] as const).map(([t, label]) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-2 text-sm font-semibold rounded-lg transition ${tab === t ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'global' ? <GlobalSeoTab /> : tab === 'pages' ? <PageSeoTab /> : <ProductSeoTab />}
    </div>
  );
}

// ── Global SEO Tab ────────────────────────────────────────────────────────────

function GlobalSeoTab() {
  const emptyGlobal = (): GlobalSeo => ({
    seo_site_name: '', seo_tagline: '', seo_title_template: '%s | Mattress Factory',
    seo_default_description: '', seo_default_keywords: '',
    seo_og_image: '', seo_canonical_url: '',
    seo_google_analytics_id: '', seo_google_site_verification: '',
    seo_robots_txt: 'User-agent: *\nAllow: /',
    social_facebook: '', social_instagram: '', social_twitter: '',
    social_youtube: '', social_whatsapp: '',
  });

  const [form, setForm]       = useState<GlobalSeo>(emptyGlobal());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);
  const [error, setError]     = useState('');

  const load = () => {
    setLoading(true);
    fetch('/api/admin/seo').then(r => r.json())
      .then(j => { if (j.success) setForm({ ...emptyGlobal(), ...j.data }); })
      .finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const set = (k: keyof GlobalSeo) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setError(''); setSaved(false);
    try {
      const res  = await fetch('/api/admin/seo', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || 'Failed');
      setSaved(true); setTimeout(() => setSaved(false), 3000);
    } catch (err: unknown) { setError(err instanceof Error ? err.message : 'Error saving'); }
    finally { setSaving(false); }
  };

  if (loading) return <Spinner />;

  return (
    <form onSubmit={handleSave} className="space-y-5 max-w-3xl">
      <div className="flex justify-end gap-2">
        <button type="button" onClick={load} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition"><RefreshCw className="w-4 h-4" /></button>
        <SaveBtn saving={saving} saved={saved} />
      </div>
      {error && <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-2">{error}</p>}

      <Section icon={<Search className="w-4 h-4 text-indigo-500" />} title="Basic SEO">
        <div className="space-y-4">
          <Field label="Site Name" hint="Shown in browser tabs and search results">
            <input value={form.seo_site_name} onChange={set('seo_site_name')} placeholder="Mattress Factory" className={input} />
          </Field>
          <Field label="Tagline">
            <input value={form.seo_tagline} onChange={set('seo_tagline')} placeholder="Premium Quality Mattresses for Better Sleep" className={input} />
          </Field>
          <Field label="Title Template" hint='Use %s as page title placeholder. e.g. "%s | Mattress Factory"'>
            <input value={form.seo_title_template} onChange={set('seo_title_template')} placeholder="%s | Mattress Factory" className={input} />
          </Field>
          <Field label="Default Meta Description" hint={`${form.seo_default_description.length}/${CHAR_DESC} chars`} warn={form.seo_default_description.length > CHAR_DESC}>
            <textarea value={form.seo_default_description} onChange={set('seo_default_description')} rows={3} placeholder="Describe your site…" className={`${input} resize-none`} />
          </Field>
          <Field label="Default Keywords" hint="Comma-separated">
            <input value={form.seo_default_keywords} onChange={set('seo_default_keywords')} placeholder="mattress, foam mattress, buy mattress online" className={input} />
          </Field>
          <Field label="Canonical URL" hint="Your primary domain (no trailing slash)">
            <input value={form.seo_canonical_url} onChange={set('seo_canonical_url')} placeholder="https://mattressfactory.in" className={input} />
          </Field>
        </div>
      </Section>

      <Section icon={<Share2 className="w-4 h-4 text-indigo-500" />} title="Open Graph / Social Preview">
        <Field label="Default OG Image URL" hint="1200×630px recommended">
          <input value={form.seo_og_image} onChange={set('seo_og_image')} placeholder="https://mattressfactory.in/og-image.jpg" className={input} />
        </Field>
        {form.seo_og_image && (
          <div className="mt-3 rounded-xl overflow-hidden border border-gray-100 w-64">
            <img src={form.seo_og_image} alt="OG preview" className="w-full h-32 object-cover" />
            <div className="p-2 bg-gray-50">
              <p className="text-xs font-semibold text-gray-700 truncate">{form.seo_site_name || 'Mattress Factory'}</p>
              <p className="text-xs text-gray-400 truncate">{form.seo_default_description || 'Your meta description'}</p>
            </div>
          </div>
        )}
      </Section>

      <Section icon={<BarChart2 className="w-4 h-4 text-indigo-500" />} title="Analytics & Verification">
        <div className="space-y-4">
          <Field label="Google Analytics ID" hint="Format: G-XXXXXXXXXX">
            <input value={form.seo_google_analytics_id} onChange={set('seo_google_analytics_id')} placeholder="G-XXXXXXXXXX" className={input} />
          </Field>
          <Field label="Google Site Verification" hint="Content value from Google Search Console">
            <input value={form.seo_google_site_verification} onChange={set('seo_google_site_verification')} placeholder="xxxxxxxx…" className={input} />
          </Field>
        </div>
      </Section>

      <Section icon={<FileText className="w-4 h-4 text-indigo-500" />} title="Robots.txt">
        <textarea value={form.seo_robots_txt} onChange={set('seo_robots_txt')} rows={6} className={`${input} resize-none font-mono text-xs`} placeholder={'User-agent: *\nAllow: /'} />
      </Section>

      <Section icon={<Globe className="w-4 h-4 text-indigo-500" />} title="Social Media Links">
        <div className="space-y-3">
          {([
            ['social_facebook', 'Facebook'], ['social_instagram', 'Instagram'],
            ['social_twitter', 'Twitter / X'], ['social_youtube', 'YouTube'],
            ['social_whatsapp', 'WhatsApp'],
          ] as [keyof GlobalSeo, string][]).map(([key, label]) => (
            <div key={key} className="flex items-center gap-3">
              <span className="text-xs font-medium text-gray-500 w-28 shrink-0">{label}</span>
              <input value={form[key]} onChange={set(key)} className={`${input} flex-1`} />
            </div>
          ))}
        </div>
      </Section>

      <div className="flex justify-end pb-4">
        <SaveBtn saving={saving} saved={saved} />
      </div>
    </form>
  );
}

// ── Page SEO Tab ──────────────────────────────────────────────────────────────

function PageSeoTab() {
  const [pages, setPages]         = useState<PageSeo[]>([]);
  const [loading, setLoading]     = useState(true);
  const [selected, setSelected]   = useState<PageSeo | null>(null);
  const [form, setForm]           = useState<Partial<PageSeo>>({});
  const [saving, setSaving]       = useState(false);
  const [saved, setSaved]         = useState(false);
  const [error, setError]         = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('/api/admin/seo/pages').then(r => r.json())
      .then(j => {
        if (j.success) {
          setPages(j.data);
          if (j.data.length > 0) selectPage(j.data[0]);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const selectPage = (p: PageSeo) => {
    setSelected(p);
    setForm({
      title: p.title || '', description: p.description || '', keywords: p.keywords || '',
      ogTitle: p.ogTitle || '', ogDescription: p.ogDescription || '', ogImage: p.ogImage || '',
      robotsIndex: p.robotsIndex, robotsFollow: p.robotsFollow, canonicalUrl: p.canonicalUrl || '',
    });
    setSaved(false); setError('');
  };

  const setF = (k: keyof PageSeo) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    setSaving(true); setError(''); setSaved(false);
    try {
      const res  = await fetch(`/api/admin/seo/pages/${selected.pageSlug}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || 'Failed');
      setPages(prev => prev.map(p => p.pageSlug === selected.pageSlug ? { ...p, ...form } as PageSeo : p));
      setSaved(true); setTimeout(() => setSaved(false), 3000);
    } catch (err: unknown) { setError(err instanceof Error ? err.message : 'Error saving'); }
    finally { setSaving(false); }
  };

  if (loading) return <Spinner />;

  return (
    <div className="flex gap-5 items-start">
      {/* Page list */}
      <div className="w-52 shrink-0 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/60">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Pages</p>
        </div>
        <div className="divide-y divide-gray-50">
          {pages.map(p => (
            <button key={p.pageSlug} onClick={() => selectPage(p)}
              className={`w-full flex items-center justify-between gap-2 px-4 py-3 text-left transition ${selected?.pageSlug === p.pageSlug ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'}`}>
              <div className="flex items-center gap-2">
                <span className={selected?.pageSlug === p.pageSlug ? 'text-indigo-500' : 'text-gray-400'}>
                  {PAGE_ICONS[p.pageSlug] || <Globe className="w-4 h-4" />}
                </span>
                <span className="text-sm font-medium">{p.pageLabel}</span>
              </div>
              {selected?.pageSlug === p.pageSlug && <ChevronRight className="w-3.5 h-3.5 text-indigo-400" />}
            </button>
          ))}
        </div>
      </div>

      {/* Edit form */}
      {selected && (
        <form onSubmit={handleSave} className="flex-1 max-w-2xl space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-800">{selected.pageLabel}</h2>
              <p className="text-xs text-gray-400">/{selected.pageSlug === 'home' ? '' : selected.pageSlug}</p>
            </div>
            <SaveBtn saving={saving} saved={saved} />
          </div>

          {error && <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-2">{error}</p>}

          {/* Google Preview */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Google Search Preview</p>
            <div className="space-y-0.5">
              <p className="text-[13px] text-gray-400 truncate">mattressfactory.in/{selected.pageSlug === 'home' ? '' : selected.pageSlug}</p>
              <p className="text-base text-blue-700 font-medium truncate">
                {form.title || `${selected.pageLabel} - Mattress Factory`}
              </p>
              <p className="text-sm text-gray-600 line-clamp-2">
                {form.description || 'Your meta description will appear here…'}
              </p>
            </div>
          </div>

          <Section icon={<Search className="w-4 h-4 text-indigo-500" />} title="Meta Tags">
            <div className="space-y-4">
              <Field label="Meta Title" hint={`${(form.title || '').length}/60 chars`} warn={(form.title || '').length > 60}>
                <input value={form.title || ''} onChange={setF('title')} placeholder={`${selected.pageLabel} | Mattress Factory`} className={input} />
              </Field>
              <Field label="Meta Description" hint={`${(form.description || '').length}/${CHAR_DESC} chars`} warn={(form.description || '').length > CHAR_DESC}>
                <textarea value={form.description || ''} onChange={setF('description')} rows={3} placeholder="Describe this page in 1-2 sentences…" className={`${input} resize-none`} />
              </Field>
              <Field label="Focus Keywords" hint="Comma-separated">
                <input value={form.keywords || ''} onChange={setF('keywords')} placeholder="mattress, buy mattress online" className={input} />
              </Field>
              <Field label="Canonical URL" hint="Leave blank to use default">
                <input value={form.canonicalUrl || ''} onChange={setF('canonicalUrl')} placeholder={`https://mattressfactory.in/${selected.pageSlug === 'home' ? '' : selected.pageSlug}`} className={input} />
              </Field>
            </div>
          </Section>

          <Section icon={<Share2 className="w-4 h-4 text-indigo-500" />} title="Social / Open Graph">
            <div className="space-y-4">
              <Field label="OG Title" hint="Leave blank to use Meta Title">
                <input value={form.ogTitle || ''} onChange={setF('ogTitle')} placeholder="Same as meta title" className={input} />
              </Field>
              <Field label="OG Description" hint="Leave blank to use Meta Description">
                <textarea value={form.ogDescription || ''} onChange={setF('ogDescription')} rows={2} placeholder="Same as meta description" className={`${input} resize-none`} />
              </Field>
              <Field label="OG Image URL" hint="1200×630px — overrides global OG image">
                <input value={form.ogImage || ''} onChange={setF('ogImage')} placeholder="https://mattressfactory.in/page-og.jpg" className={input} />
              </Field>
            </div>
          </Section>

          <Section icon={<FileText className="w-4 h-4 text-indigo-500" />} title="Robots">
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.robotsIndex !== false}
                  onChange={e => setForm(f => ({ ...f, robotsIndex: e.target.checked }))}
                  className="accent-indigo-600 w-4 h-4" />
                <div>
                  <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    {form.robotsIndex !== false ? <Eye className="w-3.5 h-3.5 text-green-500" /> : <EyeOff className="w-3.5 h-3.5 text-red-400" />}
                    Index
                  </span>
                  <p className="text-xs text-gray-400">Allow search engines to index this page</p>
                </div>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.robotsFollow !== false}
                  onChange={e => setForm(f => ({ ...f, robotsFollow: e.target.checked }))}
                  className="accent-indigo-600 w-4 h-4" />
                <div>
                  <span className="text-sm font-medium text-gray-700">Follow</span>
                  <p className="text-xs text-gray-400">Allow search engines to follow links</p>
                </div>
              </label>
            </div>
            <p className={`mt-2 text-xs font-mono px-2 py-1 rounded w-fit ${form.robotsIndex !== false ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
              {`robots: ${form.robotsIndex !== false ? 'index' : 'noindex'}, ${form.robotsFollow !== false ? 'follow' : 'nofollow'}`}
            </p>
          </Section>

          <div className="flex justify-end pb-4">
            <SaveBtn saving={saving} saved={saved} />
          </div>
        </form>
      )}
    </div>
  );
}

// ── Product SEO Tab ───────────────────────────────────────────────────────────

type ProductItem = { id: string; name: string; slug: string; metaTitle: string | null; images: { url: string }[] };
type ProductSeoForm = {
  metaTitle: string; metaDescription: string; metaKeywords: string;
  ogTitle: string; ogDescription: string; ogImage: string;
  robotsIndex: boolean; robotsFollow: boolean;
};

function ProductSeoTab() {
  const [products, setProducts]   = useState<ProductItem[]>([]);
  const [filtered, setFiltered]   = useState<ProductItem[]>([]);
  const [search, setSearch]       = useState('');
  const [loading, setLoading]     = useState(true);
  const [selected, setSelected]   = useState<ProductItem | null>(null);
  const [form, setForm]           = useState<ProductSeoForm>({ metaTitle: '', metaDescription: '', metaKeywords: '', ogTitle: '', ogDescription: '', ogImage: '', robotsIndex: true, robotsFollow: true });
  const [formLoading, setFormLoading] = useState(false);
  const [saving, setSaving]       = useState(false);
  const [saved, setSaved]         = useState(false);
  const [error, setError]         = useState('');

  useEffect(() => {
    fetch('/api/admin/seo/products').then(r => r.json()).then(j => {
      if (j.success) { setProducts(j.data); setFiltered(j.data); }
    }).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(q ? products.filter(p => p.name.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q)) : products);
  }, [search, products]);

  const selectProduct = async (p: ProductItem) => {
    setSelected(p); setSaved(false); setError('');
    setFormLoading(true);
    try {
      const res = await fetch(`/api/admin/seo/products/${p.slug}`);
      const j   = await res.json();
      if (j.success) {
        const d = j.data;
        setForm({
          metaTitle: d.metaTitle || '', metaDescription: d.metaDescription || '',
          metaKeywords: d.metaKeywords || '', ogTitle: d.ogTitle || '',
          ogDescription: d.ogDescription || '', ogImage: d.ogImage || '',
          robotsIndex: d.robotsIndex !== false, robotsFollow: d.robotsFollow !== false,
        });
      }
    } finally { setFormLoading(false); }
  };

  const setF = (k: keyof ProductSeoForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    setSaving(true); setError(''); setSaved(false);
    try {
      const res  = await fetch(`/api/admin/seo/products/${selected.slug}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || 'Failed');
      setProducts(prev => prev.map(p => p.slug === selected.slug ? { ...p, metaTitle: form.metaTitle } : p));
      setSaved(true); setTimeout(() => setSaved(false), 3000);
    } catch (err: unknown) { setError(err instanceof Error ? err.message : 'Error saving'); }
    finally { setSaving(false); }
  };

  if (loading) return <Spinner />;

  return (
    <div className="flex gap-5 items-start">
      {/* Product list */}
      <div className="w-64 shrink-0 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col" style={{ maxHeight: '75vh' }}>
        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/60">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Products</p>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search…" className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300" />
          </div>
        </div>
        <div className="overflow-y-auto flex-1 divide-y divide-gray-50">
          {filtered.length === 0 && (
            <p className="text-xs text-gray-400 text-center py-6">No products found</p>
          )}
          {filtered.map(p => (
            <button key={p.slug} onClick={() => selectProduct(p)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition ${selected?.slug === p.slug ? 'bg-indigo-50' : 'hover:bg-gray-50'}`}>
              {p.images[0] ? (
                <img src={p.images[0].url} alt="" className="w-8 h-8 rounded object-cover shrink-0" />
              ) : (
                <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center shrink-0">
                  <Box className="w-4 h-4 text-gray-300" />
                </div>
              )}
              <div className="min-w-0">
                <p className={`text-xs font-medium truncate ${selected?.slug === p.slug ? 'text-indigo-700' : 'text-gray-700'}`}>{p.name}</p>
                <p className="text-xs text-gray-400 truncate">{p.metaTitle || <span className="italic">No SEO title</span>}</p>
              </div>
              {selected?.slug === p.slug && <ChevronRight className="w-3.5 h-3.5 text-indigo-400 shrink-0 ml-auto" />}
            </button>
          ))}
        </div>
      </div>

      {/* Edit form */}
      {!selected ? (
        <div className="flex-1 flex items-center justify-center py-24 text-gray-400 text-sm">
          <div className="text-center space-y-2">
            <Box className="w-10 h-10 mx-auto text-gray-200" />
            <p>Select a product to edit its SEO</p>
          </div>
        </div>
      ) : formLoading ? <Spinner /> : (
        <form onSubmit={handleSave} className="flex-1 max-w-2xl space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-800 truncate">{selected.name}</h2>
              <p className="text-xs text-gray-400">/products/{selected.slug}</p>
            </div>
            <SaveBtn saving={saving} saved={saved} />
          </div>

          {error && <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-2">{error}</p>}

          {/* Google Preview */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Google Search Preview</p>
            <div className="space-y-0.5">
              <p className="text-[13px] text-gray-400 truncate">mattressfactory.in/products/{selected.slug}</p>
              <p className="text-base text-blue-700 font-medium truncate">
                {form.metaTitle || `${selected.name} - Mattress Factory`}
              </p>
              <p className="text-sm text-gray-600 line-clamp-2">
                {form.metaDescription || 'Your meta description will appear here…'}
              </p>
            </div>
          </div>

          <Section icon={<Search className="w-4 h-4 text-indigo-500" />} title="Meta Tags">
            <div className="space-y-4">
              <Field label="Meta Title" hint={`${form.metaTitle.length}/60 chars`} warn={form.metaTitle.length > 60}>
                <input value={form.metaTitle} onChange={setF('metaTitle')} placeholder={`${selected.name} | Mattress Factory`} className={input} />
              </Field>
              <Field label="Meta Description" hint={`${form.metaDescription.length}/${CHAR_DESC} chars`} warn={form.metaDescription.length > CHAR_DESC}>
                <textarea value={form.metaDescription} onChange={setF('metaDescription')} rows={3} placeholder="Describe this product in 1-2 sentences…" className={`${input} resize-none`} />
              </Field>
              <Field label="Focus Keywords" hint="Comma-separated">
                <input value={form.metaKeywords} onChange={setF('metaKeywords')} placeholder="mattress, foam mattress, buy mattress online" className={input} />
              </Field>
            </div>
          </Section>

          <Section icon={<Share2 className="w-4 h-4 text-indigo-500" />} title="Social / Open Graph">
            <div className="space-y-4">
              <Field label="OG Title" hint="Leave blank to use Meta Title">
                <input value={form.ogTitle} onChange={setF('ogTitle')} placeholder="Same as meta title" className={input} />
              </Field>
              <Field label="OG Description" hint="Leave blank to use Meta Description">
                <textarea value={form.ogDescription} onChange={setF('ogDescription')} rows={2} placeholder="Same as meta description" className={`${input} resize-none`} />
              </Field>
              <Field label="OG Image URL" hint="1200×630px — overrides global OG image">
                <input value={form.ogImage} onChange={setF('ogImage')} placeholder="https://mattressfactory.in/og-product.jpg" className={input} />
                {form.ogImage && (
                  <div className="mt-2 rounded-lg overflow-hidden border border-gray-100 w-48">
                    <img src={form.ogImage} alt="OG preview" className="w-full h-24 object-cover" />
                  </div>
                )}
              </Field>
            </div>
          </Section>

          <Section icon={<FileText className="w-4 h-4 text-indigo-500" />} title="Robots">
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.robotsIndex}
                  onChange={e => setForm(f => ({ ...f, robotsIndex: e.target.checked }))}
                  className="accent-indigo-600 w-4 h-4" />
                <div>
                  <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    {form.robotsIndex ? <Eye className="w-3.5 h-3.5 text-green-500" /> : <EyeOff className="w-3.5 h-3.5 text-red-400" />}
                    Index
                  </span>
                  <p className="text-xs text-gray-400">Allow search engines to index</p>
                </div>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.robotsFollow}
                  onChange={e => setForm(f => ({ ...f, robotsFollow: e.target.checked }))}
                  className="accent-indigo-600 w-4 h-4" />
                <div>
                  <span className="text-sm font-medium text-gray-700">Follow</span>
                  <p className="text-xs text-gray-400">Allow search engines to follow links</p>
                </div>
              </label>
            </div>
            <p className={`mt-2 text-xs font-mono px-2 py-1 rounded w-fit ${form.robotsIndex ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
              {`robots: ${form.robotsIndex ? 'index' : 'noindex'}, ${form.robotsFollow ? 'follow' : 'nofollow'}`}
            </p>
          </Section>

          <div className="flex justify-end pb-4">
            <SaveBtn saving={saving} saved={saved} />
          </div>
        </form>
      )}
    </div>
  );
}

// ── Shared helpers ────────────────────────────────────────────────────────────

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-gray-50 bg-gray-50/60">
        {icon}<h2 className="text-sm font-semibold text-gray-700">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Field({ label, hint, warn, children }: { label: string; hint?: string; warn?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-medium text-gray-500 block mb-1">{label}</label>
      {children}
      {hint && <p className={`text-xs mt-1 ${warn ? 'text-red-500' : 'text-gray-400'}`}>{hint}</p>}
    </div>
  );
}

function SaveBtn({ saving, saved }: { saving: boolean; saved: boolean }) {
  return (
    <button type="submit" disabled={saving}
      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition disabled:opacity-60">
      {saved ? <><CheckCircle className="w-4 h-4" /> Saved!</> : saving ? <><RefreshCw className="w-4 h-4 animate-spin" /> Saving…</> : <><Save className="w-4 h-4" /> Save</>}
    </button>
  );
}

function Spinner() {
  return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" /></div>;
}
