# FRD Website — Deploy Instructions

## Step 1: Push to GitHub

From PowerShell on Windows, navigate to:
```
cd 'C:\Users\FR Workstation\Documents\NEXXUS_Group\01_PRODUCTS_&_SERVICES\FRD\Website\frd-website'
```

If not already connected to GitHub:
```
git remote add origin https://github.com/frankriccidesign-prog/frd-web.git
git push -u origin main
```

If you get "dubious ownership" error:
```
git config --global --add safe.directory 'C:/Users/FR Workstation/Documents/NEXXUS_Group/01_PRODUCTS_&_SERVICES/FRD/Website/frd-website'
```

## Step 2: Vercel deploys automatically
Once pushed, Vercel will deploy the site. Check status at:
https://vercel.com/frankriccidesign-progs-projects/frd-web

## Step 3: Add domain in Vercel
1. Vercel → frd-web → Settings → Domains
2. Add: `frankriccidesign.com`
3. Copy the CNAME value Vercel shows

## Step 4: Cloudflare DNS
1. Go to Cloudflare → frankriccidesign.com → DNS
2. Add/update CNAME record:
   - Name: `@` (or leave blank for root)
   - Target: value from Vercel (e.g., `cname.vercel-dns.com` or specific hash)
   - Proxy: OFF (grey cloud)
3. Also add `www` CNAME pointing to same target

## Step 5: Update Stripe
1. Go to: https://dashboard.stripe.com/settings/update/company/update
2. Update URL to: https://frankriccidesign.com
3. Reply to Stripe's email to confirm

## Step 6: Redirects (post-deploy)
Set up 301 redirects from old domains:
- frankriccidesign.studio → frankriccidesign.com
- frankricciextreme.com → frankriccidesign.com
