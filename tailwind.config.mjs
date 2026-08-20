/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				brand: {
					ink: '#04182f',
					navy: '#00244d',
					blue: '#1a75cf',
					slate: '#3d5978',
					paper: '#f6f5f2',
					paper2: '#eeece7',
				},
			},
			fontFamily: {
				display: ['"Instrument Serif"', '"Times New Roman"', 'Georgia', 'serif'],
				sans: ['Archivo', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
			},
			letterSpacing: {
				label: '0.22em',
				wider2: '0.16em',
			},
			borderColor: {
				line: 'rgba(0, 36, 77, 0.14)',
				'line-soft': 'rgba(0, 36, 77, 0.09)',
				'line-light': 'rgba(255, 255, 255, 0.18)',
			},
		},
	},
	plugins: [],
}
