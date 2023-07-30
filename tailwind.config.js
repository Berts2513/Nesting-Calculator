/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js}'],
	theme: {
		extend: {
			backgroundImage: {
				facebook: 'url(/src/img/facebook logo_icon.png)',
				'footer-texture': "url('/img/footer-texture.png')",
			},
			colors: {
				lightblack: '#1f242a',
				slate: '#3b4450',
				buttonclick: '#111417',
			},
		},
		fontFamily: {
			spacegrotesk: ['Space Grotesk', 'sans-serif'],
		},
	},
	plugins: [],
};
