import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationData {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
}

interface PaginationProps {
    data: PaginationData;
    preserveFilters?: Record<string, any>;
    className?: string;
}

export function Pagination({ data, preserveFilters = {}, className = '' }: PaginationProps) {
    if (data.last_page <= 1) {
        return null;
    }

    const buildUrl = (url: string | null) => {
        if (!url) return '#';
        
        // If no filters to preserve, return original URL
        if (Object.keys(preserveFilters).length === 0) {
            return url;
        }

        try {
            const urlObj = new URL(url, window.location.origin);
            
            // Add preserved filters to URL
            Object.entries(preserveFilters).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== '' && value !== 'all') {
                    urlObj.searchParams.set(key, String(value));
                }
            });
            
            return urlObj.pathname + urlObj.search;
        } catch (error) {
            console.error('Error building pagination URL:', error);
            return url;
        }
    };

    return (
        <div className={`bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 ${className}`}>
            {/* Mobile pagination */}
            <div className="flex-1 flex justify-between sm:hidden">
                {data.links[0]?.url && (
                    <Link 
                        href={buildUrl(data.links[0].url)} 
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Anterior
                    </Link>
                )}
                {data.links[data.links.length - 1]?.url && (
                    <Link 
                        href={buildUrl(data.links[data.links.length - 1].url)} 
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                        Siguiente
                        <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                )}
            </div>

            {/* Desktop pagination */}
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Mostrando{' '}
                        <span className="font-medium">
                            {(data.current_page - 1) * data.per_page + 1}
                        </span>{' '}
                        a{' '}
                        <span className="font-medium">
                            {Math.min(data.current_page * data.per_page, data.total)}
                        </span>{' '}
                        de{' '}
                        <span className="font-medium">{data.total}</span>{' '}
                        resultados
                    </p>
                </div>
                <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                        {data.links.map((link, index) => {
                            const href = buildUrl(link.url);
                            const isFirst = index === 0;
                            const isLast = index === data.links.length - 1;
                            const isDisabled = !link.url;
                            
                            return (
                                <Link
                                    key={index}
                                    href={href}
                                    className={`
                                        relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors
                                        ${link.active
                                            ? 'z-10 bg-[#2a3d85] border-[#2a3d85] text-white'
                                            : isDisabled
                                            ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
                                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                        }
                                        ${isFirst ? 'rounded-l-md' : ''}
                                        ${isLast ? 'rounded-r-md' : ''}
                                    `}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    {...(isDisabled && { onClick: (e) => e.preventDefault() })}
                                />
                            );
                        })}
                    </nav>
                </div>
            </div>
        </div>
    );
}