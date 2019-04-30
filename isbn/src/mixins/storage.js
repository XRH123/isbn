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
					count++;
				}
			})
			if (count <= 0) {
				this[key].push(data)
				let stringifyObj = JSON.stringify(this[key])
				if (mode === 'sync') {
					wx.setStorageSync(key, stringifyObj);
				}	else {
					wx.setStorage(key, stringifyObj);
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
	/*
	** pk 数据的主键
	** val 主键的值
	** @return 返回主键对应的数据
	*/
	getDataByPK(key, pk, val) {
		let res = {};
		this[key].forEach((item) => {
			if (item[pk] === val) {
				res = item;
			}
		})
		return res;
	}
	/*
	** 根据主键获取缓存数据的位置
	** param说明
	** key 操作的数据
	** isbn 书籍条形码值
	** pk 数据的唯一字段
	** val 主键的值
	** @return 返回主键对应的数据位置
	*/
	getIndexByPK(key, pk, val) {
		let index = -1;
		this[key].forEach((item, i) => {
			if (item[pk] === val) {
				index = i;
			}
		})
		return index;
	}
	/*
	** 根据pk字段设置数据字段
	** params说明
	** key 操作的数据的标识
	** pk 操作的数据的主键
	** pkVal 操作的数据的主键值
	** attr 要设置的属性名
	** attrVal 要设置的属性值
	*/
	setAttrByPK(key, pk, pkVal, attr, attrVal) {
		let data = this.getDataByPK(key, pk, pkVal);
		let index = this.getIndexByPK(key, pk, pkVal);
		data[attr] = attrVal;
		this[key][index] = data;
		wx.setStorageSync(key, JSON.stringify(this[key]))
	}
}