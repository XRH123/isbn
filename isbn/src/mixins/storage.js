import wepy from 'wepy'

export default class StorageMixin extends wepy.mixin {
	data = {
		books: []
	}
	onLoad() {

	}
	onShow() {
		this.books = this.getStorage('books')
	}
	/*
	** 设置缓存
	** params说明
	** key 缓存对应的键名
	** data 缓存数据
	** mode 缓存设置模式 sync同步
	*/
	setStorage(key, data, pk = 'id', mode = 'sync') {
		try {
			let count = 0
			this[key].forEach((book) => {
				if (book[pk] === data[pk]) {
					count++
				}
			})
			if (count <= 0) {
				this[key].push(data)
				let stringifyObj = JSON.stringify(this[key])
				if (mode === 'sync') {
					wx.setStorageSync(key, stringifyObj)
				}	else {
					wx.setStorage(key, stringifyObj)
				}
			} else {
				return '不可重复添加'
			}
		} catch(e) {
				console.log(e)
		}
	}

	/*
	** 获取缓存
	** params说明
	** key 缓存对应的键名
	** data 缓存数据
	** mode 缓存设置模式 sync同步
	*/
	getStorage(key, mode='sync') {
		try {
			let stringifyObj;
			if (mode === 'sync') {
				stringifyObj = wx.getStorageSync(key)
			}	else {
				stringifyObj = wx.getStorage(key)
			}
			return stringifyObj ? JSON.parse(stringifyObj) : []
		} catch(e) {
			console.log(e)
		}
	}
}