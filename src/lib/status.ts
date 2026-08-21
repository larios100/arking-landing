/** Clases de fondo para la etiqueta de estatus, según qué tan cerca esté de venderse. */
export function statusBadgeClass(status: string): string {
    const value = status.trim().toUpperCase();
    if (value === 'PREVENTA') return 'bg-brand-amber';
    if (value.includes('VENTA')) return 'bg-brand-green';
    return 'bg-brand-navy';
}
