import { FarmFreshIcon, HealthyChickensIcon, TrustedQualityIcon, FreeRangeIcon, OrganicIcon, ColorfulVarietyIcon, DailyHealthChecksIcon, TemperatureControlIcon, CarefulPackagingIcon, FreshCollectionIcon, SolarPoweredIcon, RainwaterHarvestingIcon, ZeroWasteIcon, BiodiversityIcon, SameDayDeliveryIcon, ScheduledDeliveriesIcon, BulkOrdersIcon, OnlinePlatformIcon, PhoneOrdersIcon, FarmVisitsIcon, PremiumQualityIcon, ReliableDeliveryIcon, SustainableFarmingIcon, PoultryHealthIcon, BiosecurityIcon, RetailersTrustIcon, Iso9001Icon, HaccpIcon, AnimalWelfareIcon } from './icons';

export const FeatureContent = {
    hero: {
        highlights: [
            {
                icon: FarmFreshIcon,
                title: 'Farm Fresh Eggs',
                description: 'Nutritious and delicious eggs sourced directly from our farm.'
            },
            {
                icon: HealthyChickensIcon,
                title: 'Healthy Chickens',
                description: 'Well-cared for poultry raised with natural feed and proper welfare.'
            },
            {
                icon: TrustedQualityIcon,
                title: 'Trusted Quality',
                description: 'Certified processes ensuring safety and freshness every step of the way.'
            }
        ]
    },
    products: {
        benefits: [
            {
                icon: FreeRangeIcon,
                title: 'Free-Range Excellence',
                description: 'Hens roam freely in spacious, natural environments',
                features: [
                    'Minimum 4 square meters per hen',
                    'Natural sunlight and fresh air',
                    'Premium organic feed',
                    'Stress-free living conditions'
                ]
            },
            {
                icon: OrganicIcon,
                title: 'Organic Heritage',
                description: 'Rare breed chickens fed exclusively on certified organic feed',
                features: [
                    'Certified organic feed',
                    'Heritage breed chickens',
                    'Limited availability',
                    'Premium pricing'
                ]
            },
            {
                icon: ColorfulVarietyIcon,
                title: 'Colorful Variety',
                description: 'Experience nature\'s diversity with our specialty egg collection',
                features: [
                    'Blue, green, and speckled eggs',
                    'Heritage breed variety',
                    'Perfect for special occasions',
                    'Unique natural products'
                ]
            }
        ]
    },
    quality: {
        standards: [
            {
                icon: DailyHealthChecksIcon,
                title: 'Daily Health Checks',
                description: 'Every bird receives daily health monitoring by qualified veterinarians'
            },
            {
                icon: TemperatureControlIcon,
                title: 'Temperature Control',
                description: 'Maintained freshness through controlled storage and cold-chain delivery'
            },
            {
                icon: CarefulPackagingIcon,
                title: 'Careful Packaging',
                description: 'Prevent damage during transport with our specialized packaging'
            },
            {
                icon: FreshCollectionIcon,
                title: 'Fresh Collection',
                description: 'Multiple daily collections ensure maximum freshness'
            }
        ],
        environmental: [
            {
                icon: SolarPoweredIcon,
                title: 'Solar Powered',
                description: 'Farm operations powered by renewable solar energy'
            },
            {
                icon: RainwaterHarvestingIcon,
                title: 'Rainwater Harvesting',
                description: 'Sustainable water management through natural collection'
            },
            {
                icon: ZeroWasteIcon,
                title: 'Zero Waste',
                description: 'Composting program turns waste into nutrient-rich fertilizer'
            },
            {
                icon: BiodiversityIcon,
                title: 'Biodiversity',
                description: 'Preserve native vegetation and local ecosystems'
            }
        ]
    },
    services: {
        delivery: [
            {
                icon: SameDayDeliveryIcon,
                title: 'Same-Day Delivery',
                description: 'Available in select areas for urgent orders',
                availability: 'Select areas only'
            },
            {
                icon: ScheduledDeliveriesIcon,
                title: 'Scheduled Deliveries',
                description: 'Set up regular deliveries that fit your lifestyle',
                options: ['Weekly', 'Bi-weekly', 'Monthly']
            },
            {
                icon: BulkOrdersIcon,
                title: 'Bulk Orders',
                description: 'Special pricing for restaurants, hotels, and large families',
                benefits: ['Competitive pricing', 'Guaranteed freshness', 'Priority handling']
            }
        ],
        ordering: [
            {
                icon: OnlinePlatformIcon,
                title: 'Online Platform',
                description: 'User-friendly website for easy browsing and ordering',
                features: ['Product catalog', 'Secure checkout', 'Order tracking']
            },
            {
                icon: PhoneOrdersIcon,
                title: 'Phone Orders',
                description: 'Personalized service through direct phone contact',
                contact: '083 353 1044'
            },
            {
                icon: FarmVisitsIcon,
                title: 'Farm Visits',
                description: 'Schedule tours to see our sustainable practices firsthand',
                experience: ['Meet our chickens', 'See our facilities', 'Learn our process']
            }
        ]
    }
}

export const PricingContent = {
    eggs: {
        fresh: {
            'dozen': 'R45.00'
        },
        organic: {
            'dozen': 'R65.00'
        }
    },
    chickens: {
        broiler: {
            'per kg': 'R120.00'
        },
        layer: {
            'each': 'R180.00'
        },
        dayOld: {
            'each': 'R25.00'
        }
    },
    delivery: {
        standard: 'R25.00',
        express: 'R45.00',
        bulk: 'Free (orders over R500)',
        areas: {
            'Limpopo': 'R25.00',
            'Gauteng': 'R45.00',
            'Mpumalanga': 'R35.00',
            'North West': 'R40.00'
        }
    },
    discounts: {
        newCustomer: '15% off first order (GOLDENNEST15)',
        subscribe: '10% off regular deliveries',
        bulk: '5% off orders over R1000',
        referral: 'R50 credit for each successful referral'
    }
}

export const QualityContent = {
    title: 'Quality You Can Trust',
    subtitle: 'We follow rigorous quality checks and maintain industry certifications to keep our poultry safe and healthy',
    description: 'Our commitment to excellence ensures that every product meets the highest standards.',
    stats: [
        {
            number: '10+',
            label: 'Years Experience'
        },
        {
            number: '5000+',
            label: 'Eggs Daily'
        },
        {
            number: '100+',
            label: 'Happy Clients'
        }
    ],
    certifications: [
        {
            id: 'poultry-health',
            title: 'Certified Poultry Health & Safety',
            description: 'Our farm meets and exceeds all local and international poultry health standards.',
            icon: PoultryHealthIcon
        },
        {
            id: 'biosecurity',
            title: 'Biosecurity Standards Compliant',
            description: 'We maintain strict biosecurity protocols to prevent disease and ensure animal welfare.',
            icon: BiosecurityIcon
        },
        {
            id: 'retailers-trust',
            title: 'Trusted by Retailers Across South Africa',
            description: 'Over 100 retailers and restaurants trust us for consistent quality and reliable supply.',
            icon: RetailersTrustIcon
        },
        {
            id: 'iso-9001',
            title: 'ISO 9001 Quality Management',
            description: 'Our quality management system is certified to international standards.',
            icon: Iso9001Icon
        },
        {
            id: 'haccp',
            title: 'HACCP Food Safety Certified',
            description: 'We follow Hazard Analysis and Critical Control Point principles for food safety.',
            icon: HaccpIcon
        },
        {
            id: 'animal-welfare',
            title: 'Animal Welfare Approved',
            description: 'Our farming practices prioritize the health and well-being of our poultry.',
            icon: AnimalWelfareIcon
        }
    ],
    process: [
        {
            step: '1',
            title: 'Selection',
            description: 'Careful selection of healthy breeding stock and quality feed'
        },
        {
            step: '2',
            title: 'Monitoring',
            description: '24/7 monitoring of health, environment, and feeding'
        },
        {
            step: '3',
            title: 'Testing',
            description: 'Regular testing for quality, safety, and nutritional content'
        },
        {
            step: '4',
            title: 'Delivery',
            description: 'Safe and timely delivery to maintain freshness'
        }
    ],
    faqs: [
        {
            id: 'organic-eggs',
            question: 'Are your eggs organic?',
            answer: 'Our eggs come from healthy hens fed on natural grain-based diets. While not certified organic, we use sustainable farming practices and avoid unnecessary chemicals.'
        },
        {
            id: 'delivery',
            question: 'Do you deliver?',
            answer: 'Yes, we deliver bulk orders to local retailers and distributors. We also offer pickup options for smaller orders at our farm location.'
        },
        {
            id: 'quality-checks',
            question: 'What quality checks do you perform?',
            answer: 'We conduct daily health checks, regular egg quality testing, and continuous monitoring of feed quality and environmental conditions.'
        },
        {
            id: 'free-range',
            question: 'Are your chickens free-range?',
            answer: 'Our chickens have access to both indoor and outdoor spaces, ensuring they can express natural behaviors while being protected from predators and extreme weather.'
        },
        {
            id: 'food-safety',
            question: 'How do you ensure food safety?',
            answer: 'We follow strict hygiene protocols, regular testing, and maintain detailed records of all processes from farm to delivery.'
        },
        {
            id: 'certifications',
            question: 'What certifications do you hold?',
            answer: 'We maintain multiple certifications including ISO 9001, HACCP, and local food safety standards. All certifications are regularly audited and renewed.'
        }
    ]
}
