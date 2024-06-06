const utils = {
	delay: (ms: number) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(null);
			}, ms);
		});
	},
}

export default utils