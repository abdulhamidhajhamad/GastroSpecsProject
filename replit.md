# GastroSpecs

A full-stack Next.js 16 web application for a global commercial kitchen equipment procurement agency.

## Architecture

- **Framework**: Next.js 16 (App Router) with TypeScript
- **Styling**: Tailwind CSS v4 + tw-animate-css
- **Fonts**: Inter (sans-serif) + Playfair Display (serif) from Google Fonts
- **Package Manager**: pnpm
- **Port**: 5000 (configured for Replit)

## Project Structure

```
app/
  layout.tsx          # Root layout with fonts
  page.tsx            # Homepage (built)
  globals.css         # Global styles + design tokens
  catalog/
    page.tsx          # Product catalog grid
    [slug]/page.tsx   # Product detail page
  services/page.tsx   # Services page
  projects/page.tsx   # Projects/case studies
  about/page.tsx      # About page
  contact/page.tsx    # Quote request form
  ar/                 # Arabic RTL mirror
    layout.tsx        # RTL layout wrapper
    page.tsx          # Arabic homepage
  portal/             # Staff portal (separate visual system)
    layout.tsx        # Portal layout with sidebar
    login/page.tsx    # Staff login
    dashboard/page.tsx
    leads/page.tsx    # Leads/CRM with slide-over panel
    projects/page.tsx # Kitchen layout project manager
    procurement/page.tsx # RFQ management
    orders/page.tsx   # Orders & shipments with DDP tracking
    invoices/page.tsx # Invoicing & payments with modal
    support/page.tsx  # Support ticket queue
    inventory/page.tsx # Inventory & compliance
    settings/page.tsx # System settings & user management
  api/
    contact/route.ts  # Contact form POST handler
  sitemap.ts
  robots.ts

components/
  Navbar.tsx          # Shared public navbar
  Footer.tsx          # Shared public footer
  Hero.tsx            # Homepage hero
  Stats.tsx           # Stats bar
  Solutions.tsx       # Solutions section
  ProductFeature.tsx  # Featured product
  Projects.tsx        # Projects preview
  CTA.tsx             # Call-to-action section
  portal/
    PortalSidebar.tsx # Staff portal sidebar nav
    PortalHeader.tsx  # Staff portal top bar with search
    StatCard.tsx      # Dashboard stat card component

data/
  products.ts         # Product catalog data (12 products)
  projects.ts         # Case studies data (6 projects)
  services.ts         # Services data (4 services)

lib/
  home-data.ts        # Homepage content + navigation data
```

## Design System

- **Primary Background**: #FFFFFF
- **Dark Sections**: #000000 / #111111 (footer, CTA)
- **Text Primary**: #000000
- **Text Muted**: gray-500 / gray-400
- **Borders**: gray-200 / border-gray-200
- **Button Primary**: bg-black text-white (no border-radius)
- **Button Secondary**: border border-black text-black
- **WhatsApp**: #25D366
- **Heading Font**: font-serif (Playfair Display)
- **Body Font**: font-sans (Inter)

## Key Features

### Public Site
- Homepage with hero, stats, solutions, featured product, projects, CTA
- Product catalog with category filtering
- Individual product detail pages with specs and related products
- Services page with process steps and portfolio
- Projects/case studies page
- About page with team and values
- Contact/quote request form with file upload

### Staff Portal
- Dedicated visual system (sidebar nav, separate from public site)
- Dashboard with live stats and activity feed
- Leads/CRM with slide-over detail panel
- Kitchen layout project manager with CAD viewer mock
- Procurement/RFQ management table
- Orders & shipments with DDP cost breakdown
- Invoicing & payments with create invoice modal
- Support ticket queue with dispatch control
- Inventory & compliance management
- System settings with user management and security controls

### Arabic RTL
- Full RTL layout with Arabic content
- Separate /ar route with dir="rtl" layout

## Running

```bash
pnpm run dev   # Development on port 5000
pnpm run build # Production build
pnpm run start # Production on port 5000
```
