import React from 'react';

// Icon type for React components
export type IconComponent = React.ComponentType<{ className?: string }>;

// Hero Section Types
export interface HeroContentType {
    title: string;
    subtitle: string;
    description: string;
    cta: {
        primary: string;
        secondary: string;
    };
}

// About Section Types
export interface AboutContentType {
    title: string;
    subtitle: string;
    story: string;
    storyContinued: string;
    features: Array<{
        icon: IconComponent;
        title: string;
        description: string;
    }>;
    mission: string;
    values: Array<{
        title: string;
        description: string;
    }>;
    journey: Array<{
        year: string;
        title: string;
        description: string;
    }>;
    team: Array<{
        role: string;
        description: string;
        icon: IconComponent;
    }>;
}

// Vision Section Types
export interface VisionContentType {
    title: string;
    subtitle: string;
    vision: string;
    mission: string;
    values: Array<{
        title: string;
        description: string;
    }>;
}

// Products Section Types
export interface ProductType {
    name: string;
    subtitle: string;
    description: string;
    price: string;
    image: string;
    featured?: boolean;
    details?: {
        available?: string[];
        packaging?: string[];
        note?: string;
        weightRange?: string;
    };
}

export interface OurProductsContentType {
    title: string;
    subtitle: string;
    description: string;
    products: ProductType[];
    categories: Array<{ name: string; active: boolean }>;
    features: Array<{
        icon: IconComponent;
        title: string;
        description: string;
    }>;
}

// Services Section Types
export interface ServiceType {
    title: string;
    description: string;
}

export interface ServicesContentType {
    title: string;
    subtitle: string;
    services: ServiceType[];
}

// Quality Section Types
export interface QualityContentType {
    title: string;
    subtitle: string;
    description: string;
    stats: Array<{
        number: string;
        label: string;
    }>;
    certifications: Array<{
        id: string;
        title: string;
        description: string;
        icon: string;
    }>;
    process: Array<{
        step: string;
        title: string;
        description: string;
    }>;
    faqs: Array<{
        id: string;
        question: string;
        answer: string;
    }>;
    farmStandards: string[];
    environmentalResponsibility: string[];
    qualityAssurance: string[];
}

// Location Section Types
export interface LocationContentType {
    title: string;
    subtitle: string;
    description: string;
    benefits: string;
}

// Customer Promise Types
export interface PromiseType {
    title: string;
    description: string;
}

export interface CustomerPromiseContentType {
    title: string;
    subtitle: string;
    promises: PromiseType[];
}

// Testimonials Types
export interface TestimonialType {
    quote: string;
    author: string;
    location: string;
}

export interface WhatCustomersSayContentType {
    title: string;
    subtitle: string;
    testimonials: TestimonialType[];
}

// CTA Section Types
export interface OfferType {
    title: string;
    description: string;
    code?: string;
}

export interface CTAContentType {
    title: string;
    subtitle: string;
    offers: OfferType[];
}

// Contact Section Types
export interface ContactMethodType {
    title: string;
    description: string;
}

export interface ContactContentType {
    title: string;
    subtitle: string;
    contactMethods: ContactMethodType[];
    delivery: {
        areas: string;
        special: string;
    };
    contactInfo: {
        phone: string;
        email: string;
        location: string;
    };
}

// Navigation Types
export interface MenuItemType {
    label: string;
    href: string;
    description: string;
}

export interface NavigationContentType {
    logo: {
        text: string;
        alt: string;
    };
    menu: MenuItemType[];
    cta: {
        primary: string;
        secondary: string;
    };
}

export interface FooterContentType {
    company: {
        name: string;
        tagline: string;
        description: string;
    };
    quickLinks: Array<{ label: string; href: string }>;
    services: Array<{ label: string; href: string }>;
    contact: {
        phone: string;
        email: string;
        location: string;
        hours: string;
    };
    social: Array<{ platform: string; href: string; icon: string }>;
    legal: Array<{ label: string; href: string }>;
}

// SEO Types
export interface SEOContentType {
    default: {
        title: string;
        description: string;
        keywords: string;
        ogImage: string;
        twitterImage: string;
    };
    pages: {
        [key: string]: {
            title: string;
            description: string;
            keywords: string;
        };
    };
    structuredData: {
        organization: Record<string, any>;
        localBusiness: Record<string, any>;
    };
}

// Feature Types
export interface FeatureHighlightType {
    icon: IconComponent;
    title: string;
    description: string;
}

export interface ProductBenefitType {
    icon: IconComponent;
    title: string;
    description: string;
    features: string[];
}

export interface QualityStandardType {
    icon: IconComponent;
    title: string;
    description: string;
}

export interface EnvironmentalFeatureType {
    icon: IconComponent;
    title: string;
    description: string;
}

export interface DeliveryServiceType {
    icon: IconComponent;
    title: string;
    description: string;
    availability?: string;
    options?: string[];
    benefits?: string[];
}

export interface OrderingServiceType {
    icon: IconComponent;
    title: string;
    description: string;
    contact?: string;
    features?: string[];
    experience?: string[];
}

export interface FeatureContentType {
    hero: {
        highlights: FeatureHighlightType[];
    };
    products: {
        benefits: ProductBenefitType[];
    };
    quality: {
        standards: QualityStandardType[];
        environmental: EnvironmentalFeatureType[];
    };
    services: {
        delivery: DeliveryServiceType[];
        ordering: OrderingServiceType[];
    };
}

// Pricing Types
export interface PricingContentType {
    eggs: {
        freeRange: Record<string, string>;
        organic: Record<string, string>;
        brown: Record<string, string>;
        specialty: Record<string, string>;
    };
    chickens: {
        whole: Record<string, string>;
        portions: Record<string, string>;
    };
    delivery: {
        standard: string;
        express: string;
        bulk: string;
        areas: Record<string, string>;
    };
    discounts: {
        newCustomer: string;
        subscribe: string;
        bulk: string;
        referral: string;
    };
}

// Gallery Types
export interface GalleryImageType {
    id: string;
    src: string;
    alt: string;
    category: string;
}

export interface GalleryContentType {
    title: string;
    subtitle: string;
    categories: string[];
    images: GalleryImageType[];
    behindTheScenes: {
        title: string;
        subtitle: string;
        description: string;
        descriptionContinued: string;
    };
    visitInvitation: {
        title: string;
        description: string;
    };
}
