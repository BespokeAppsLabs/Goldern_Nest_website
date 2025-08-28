import {
  FarmFreshIcon,
  SustainablePracticesIcon,
  HealthyChickensIcon,
  PremiumQualityIcon,
  ColorfulVarietyIcon,
  PhoneIcon
} from './icons';

export const NavigationContent = {
    logo: {
        text: 'Golden Nest Poultry',
        alt: 'Golden Nest Poultry Logo'
    },
    menu: [
        {
            label: 'Home',
            href: '/',
            description: 'Welcome to Golden Nest Poultry',
            icon: FarmFreshIcon
        },
        {
            label: 'About',
            href: '/about',
            description: 'Our Story & Values',
            icon: SustainablePracticesIcon
        },
        {
            label: 'Products',
            href: '/products',
            description: 'Premium Eggs & Poultry',
            icon: HealthyChickensIcon
        },
        {
            label: 'Quality',
            href: '/quality',
            description: 'Our Standards & Practices',
            icon: PremiumQualityIcon
        },
        {
            label: 'Gallery',
            href: '/gallery',
            description: 'Farm Life & Products',
            icon: ColorfulVarietyIcon
        },
        {
            label: 'Contact',
            href: '/contact',
            description: 'Get in Touch',
            icon: PhoneIcon
        }
    ],
    cta: {
        primary: 'Shop Now',
        secondary: 'Learn More'
    }
}

export const FooterContent = {
    company: {
        name: 'Golden Nest Poultry',
        tagline: 'From Farm to Family - Nature\'s Perfect Promise',
        description: 'Premium farm-fresh eggs and poultry products from the heart of Limpopo, South Africa.'
    },
    quickLinks: [
        { label: 'About Us', href: '/about' },
        { label: 'Our Products', href: '/products' },
        { label: 'Quality Standards', href: '/quality' },
        { label: 'Contact', href: '/contact' }
    ],
    services: [
        { label: 'Online Ordering', href: '/products' },
        { label: 'Bulk Orders', href: '/contact' },
        { label: 'Farm Visits', href: '/contact' },
        { label: 'Delivery', href: '/contact' }
    ],
    contact: {
        phone: '083 353 1044',
        email: 'info@goldennestpoultry.co.za',
        location: 'Limpopo, South Africa',
        hours: 'Mon-Fri: 8AM-6PM, Sat: 8AM-4PM'
    },
    social: [
        { platform: 'Facebook', href: '#', icon: 'facebook' },
        { platform: 'Instagram', href: '#', icon: 'instagram' },
        { platform: 'WhatsApp', href: '#', icon: 'whatsapp' }
    ],
    legal: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Shipping Policy', href: '/shipping' },
        { label: 'Return Policy', href: '/returns' }
    ]
}

