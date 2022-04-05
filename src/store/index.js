import Vue from 'vue'
import Vuex from 'vuex'
import createpersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createpersistedState()],
    state: {
        theme: 'green',
        themebg: '',
        count: '0',
        // 选中的日期
        selectTimestamp: ' ',
        input: {
            inputContent: "",
            isSettingTime: '',
            isComplete: ''
        },
        oldValue: '',
        inputSettingIsError: false,
        pastDaysTimeStamp: [],
        todoListAll: [],
        oldValue: [],
        clockInList: [],

    },
    getters: {

    },
    mutations: {
        changetheme(state, theme) {
            state.theme = theme
        },
        updateSelected(state, newSelect) {
            state.selectTimestamp = newSelect
        },
        editItem(state, payload) {
            if (payload.type == 'todo') {
                state.input = {
                    inputContent: payload.oldValue.content,
                    isSettingTime: payload.oldValue.isSettingTime
                }
            }
        },
        removeItem(state, payload) {
            if (payload.type === 'todo') {
                let i = state.todoListAll.indexOf(payload.list)
                state.todoListAll.splice(i, 1)
            } else if (payload.type === 'clockin') {
                let i = state.clockInList.indexOf(payload.item)
                state.clockInList.splice(i, 1)
            }
        },
        //插入时间戳
        addPastDaysTimeStamp(state) {
            state.pastDaysTimeStamp.push(state.selectTimestamp)
                // console.log(state.selectTimestamp);
        },
        createItem(state, payload) {
            if (payload.type == 'todo') {
                state.todoListAll.push(payload.msg)
                state.oldValue = state.todoListAll
            } else if (payload.type == 'clockin') {
                state.clockInList.push(payload.msg)
                    // state.oldValue = state.todoListAll
            }
            // console.log(state.todoListAll[0]);
        },
        updateItem(state, payload) {
            let i = state.todoListAll.indexOf(payload.oldValue)
            state.todoListAll.splice(i, 1, payload.msg)
        },
        //保存或取消后清空表单
        clearInput(state) {
            state.input = {
                inputinputContent: '',
                isSettingTime: ''
            }
        },
        //判断是否完成
        judgeComplete(state, stamp) {
            for (let i; i < state.todoListAll.length; i++) {
                if (stamp == state.todoListAll[i].timeStamp) {
                    state.todoListAll[i].isComplete = !state.todoListAll[i].isComplete
                }
            }
            console.log(state.todoListAll);

        },
        changethemebg(state, themebg) {
            state.themebg = themebg
        },


    },
    actions: {

    },
    modules: {}
})