const root = 'https://ai.weixue100.com' // 线上
// const root = 'https://ai-test.weixue100.com' // 测试

import MinRequest from './MinRequest'
import { Base64 } from 'js-base64';
import { encryptCode, decryptCode } from "./AesEncrypt"
import store from "@/store"
import { showToast } from '../common/utils';

const request = new MinRequest()
// 加密接口（ noEncrypt = 1 ）接口不走加密逻辑 
const is_plain_data = process.env.NODE_ENV === 'development' ? 1 : 0; // 显示原文，1原文 0加密
/* 加密处理  data-有数据，就是请求拦截器 */
const codeRule = (config, resData) => {
	// noEncrypt 传true不走加密逻辑
	if (!config.noEncrypt) { // noEncrypt = false 
		if (config.method.toLocaleUpperCase() === 'POST') {
			if (!resData) { // 请求拦截
				if (!config.isRefresh) { // 重新发起的接口已经处理过数据结构了，无需重新处理
					const reqData = {
						is_plain_data,
						data: {
							params: null
						}
					}
					reqData.data.params = config.data || null
					if (typeof reqData.data.params === 'object') { // 清除多余 null 的参数
						for (let key in reqData.data.params) {
							if (reqData.data.params[key] === null) delete reqData.data.params[key]
						}
					}
					if (!is_plain_data) { // 加密
						reqData.data = encryptCode(reqData.data)
					}
					config.data = reqData
				}
			} else { // 响应拦截
				if (!is_plain_data) {
					if (resData.data && typeof resData.data === 'string' && Base64.btoa(Base64.atob(resData.data)) === resData
						.data)
						resData.data = decryptCode(resData.data)
				}
			}
		}
	}
	return { config, data: resData }
}


// 请求拦截器
request.interceptors.request((config) => {
	config = codeRule(config).config
	return config
})

// 响应拦截器
request.interceptors.response(response => {
	var { config, data } = response
	const { code, msg } = data
	if (code === 0) {
		data = codeRule(config, data).data
		return Promise.resolve(data)
	}
	if (code === 100001) {
		return store().refreshToken().then(() => { // 刷新token
			const { method, url, data } = config
			return request[method.toLocaleLowerCase()](url, data, { isRefresh: 1 })
		})
	}
	if (code === 401 || code === 100002 || code === 100003 || code === 101001) {
		uni.removeStorageSync("token")
		uni.removeStorageSync("userinfo")
	}

	if (!config.hideMessage) showToast(msg)
	return Promise.reject(response)
})

// 设置默认配置
request.setConfig((config) => {
	config.baseURL = root
	return config
})
//request.post(weixueai.root + '/api/common/get_privacy_policy', data , { showLoading: 1 }) // 打开 loading
export const weixueai = {
	root: '/ai',
	common: { // 通用
		get_privacy_policy(data) { // 隐私协议
			return request.post(weixueai.root + '/api/common/get_privacy_policy', data)
		},
		config(data) { // 隐私协议
			return request.post(weixueai.root + '/api/common/config', data)
		},
		alioss(data) { // 获取阿里OSS上传凭证
			return request.post(weixueai.root + '/api/common/alioss', data)
		},
		ali_sts_receipt(data) { // 阿里sts
			return request.post(weixueai.root + '/api/common/ali_sts_receipt', data)
		},
		tx_sts_receipt(data) { // 腾讯sts
			return request.post(weixueai.root + '/api/common/tx_sts_receipt', data)
		},
	},
	dialogue: { // 对话
		start_message(data) { // 开始聊天
			return request.post(weixueai.root + '/api/study/start_message', data)
		},
		result_message(data) { // 聊天结果
			return request.post(weixueai.root + '/api/study/result_message', data)
		},
		send_message(data) { // 发送聊天信息
			return request.post(weixueai.root + '/api/study/send_message', data)
		},
		end_message(data) { // 结束聊天
			return request.post(weixueai.root + '/api/study/end_message', data)
		},
		get_message_grammar_correction(data) { // 语法纠正
			return request.post(weixueai.root + '/api/study/get_message_grammar_correction', data, { hideMessage: 1 })
		},
		get_message_speech_synthesis(data) { // 语音合成
			return request.post(weixueai.root + '/api/study/get_message_speech_synthesis', data, { hideMessage: 1 })
		},
		get_message_polish(data) { // 润色（建议这样说）
			return request.post(weixueai.root + '/api/study/get_message_polish', data, { hideMessage: 1 })
		},
		get_message_speech_correction(data) { // 发音纠正
			return request.post(weixueai.root + '/api/study/get_message_speech_correction', data, { hideMessage: 1 })
		},
		get_message_translate(data) { // 翻译
			return request.post(weixueai.root + '/api/study/get_message_translate', data)
		},
	},
	study: { // 首页
		get_learn_module_list(data) { // 首页分类
			return request.post(weixueai.root + '/api/study/get_learn_module_list', data)
		},
		get_learn_module_list_page(data) { // 首页分类分页
			return request.post(weixueai.root + '/api/study/get_learn_module_list_page', data)
		},
		get_conversation_list(data) { // 分类下的题目
			return request.post(weixueai.root + '/api/study/get_conversation_list', data)
		},
		get_conversation_detail(data) { // 题目详情
			return request.post(weixueai.root + '/api/study/get_conversation_detail', data)
		},
		get_study_record(data) { // 学习记录列表
			return request.post(weixueai.root + '/api/study/get_study_record', data)
		},
		get_speak_setting(data) { // 获取对话设置
			return request.post(weixueai.root + '/api/study/get_speak_setting', data)
		},
		set_speak_setting(data) { // 设置对话设置
			return request.post(weixueai.root + '/api/study/set_speak_setting', data)
		},
	},
	favorite: { // 收藏夹
		get_favorite_list(data) { // 收藏列表
			return request.post(weixueai.root + '/api/favorite/get_favorite_list', data)
		},
		create_favorite(data) { // 创建收藏
			return request.post(weixueai.root + '/api/favorite/create_favorite', data)
		},
		delete_favorite(data) { // 取消收藏
			return request.post(weixueai.root + '/api/favorite/delete_favorite', data)
		},
	},
	vocab: { // 生词本
		delete_user_vocab(data) { // 删除生词
			return request.post(weixueai.root + '/api/vocab/delete_user_vocab', data)
		},
		search_word(data) { // 搜索生词
			return request.post(weixueai.root + '/api/vocab/search_word', data)
		},
		create_user_vocab(data) { // 创建生词
			return request.post(weixueai.root + '/api/vocab/create_user_vocab', data)
		},
		get_user_vocab_list(data) { // 生词本列表
			return request.post(weixueai.root + '/api/vocab/get_user_vocab_list', data)
		},
	}
}

/* 用户中心接口 */
export const ucenter = {
	root: '/ucenter',
	common: {
		send_sms(data) {
			return request.post(ucenter.root + '/api/common/send_sms', data)
		},
	},
	user: {
		// 登录
		login(data) {
			return request.post(ucenter.root + '/api/user/login', data, { hideMessage: 1 })
		},
		// 登录token刷新
		refresh_token(data) {
			return request.post(ucenter.root + '/api/user/refresh_token', data)
		},
		// 登出
		logout(data) {
			return request.post(ucenter.root + '/api/user/logout', data)
		},
		// 用户信息（当前登录用户）
		info(data) {
			return request.post(ucenter.root + '/api/user/info', data)
		},
		// 用户信息（当前登录用户）
		update(data) {
			return request.post(ucenter.root + '/api/user/update', data)
		},
		// 找回密码
		find_pwd(data) {
			return request.post(ucenter.root + '/api/user/find_pwd', data)
		},
	}
}
export default { weixueai, ucenter }