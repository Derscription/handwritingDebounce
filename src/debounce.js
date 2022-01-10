function westDebounce(fn, delay, immediate = false, resultCallback) {
	let timer = null
	let isInvoke = false
	const _decounce = function (...args) {
		if (timer) clearTimeout(timer)

		if (immediate && !isInvoke) {
			const result = fn.apply(this, args)
			if (resultCallback && typeof resultCallback === "function") {
				resultCallback(result)
			} else {
				throw new TypeError("resultCallback not a function")
			}
			timer = null
			isInvoke = true
		} else {
			timer = setTimeout(() => {
				const result = fn.apply(this, args)
				if (resultCallback && typeof resultCallback === "function") {
					resultCallback(result)
				} else {
					throw new TypeError("resultCallback not a function")
				}
				timer = null
				isInvoke = false
			}, delay)
		}
	}

	_decounce.cancel = function () {
		if (timer) clearTimeout(timer)
		timer = null
		isInvoke = false
	}

	return _decounce
}

// 测试
let counter = 0
const inputEl = document.querySelector("input")
const debounce = westDebounce(
	function (event) {
		console.log(`发送了第${++counter}次网络请求`, this, event)
		return "aaa"
	},
	1000,
	true,
	res => {
		console.log(res)
	}
)
inputEl.oninput = debounce

const btn = document.querySelector("#btn")
console.log(btn)
btn.onclick = debounce.cancel
