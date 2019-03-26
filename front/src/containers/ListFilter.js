import React from 'react';
import debounce from '../misc/debounce';

export default class extends React.Component {    
    state = { filter: '' };

    setPageIndex(pageIndex) {
        let newRequest = { 
            pageIndex: pageIndex,
            pageSize: this.props.request.limit
        };
        if (this.props.request.filter) {
            newRequest.filter = this.props.request.filter;
        }
        this.props.updateRequest(newRequest);
    }

    // static getDerivedStateFromProps(props) {
    getInitialState (props) {
        // TODO: getInitialState не может обновить state, после инициализации компонента
        // при изменении props. Нужно найти способ обновления state так, чтобы он не флудил как
        // случае с getDerivedStateFromProps
        // Можно сравнивать новые пришедшие данные со старыми и блокировать Render(), 
        // если в действительности нет обновлений
        // изучить https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html
        // TODO: найти причину, по которой props.request.filter может передаваться сюда неопределенным.
        // TODO: исправить эту ситуацию.
        console.log ('update state from props:', props);
        return { filter: props.request.filter || '' };
    }

    onFilterChange = (evt) => {
        const newState = {...this.state, filter: evt.target.value};
        this.setState(newState, () => { /* console.log ('state set: ', this.state)*/ });
        this.filterDebounce(evt.target.value);
    }

    filterDebounce = debounce(value => {
        // console.log ('debounce fired with value');
            let newRequest = { 
                pageIndex: this.props.request.pageIndex,
                pageSize: this.props.request.limit
            };
            if (this.props.request.filter) {
                newRequest.filter = this.props.request.filter;
            }
            // TODO: здесь и в методе выше используется один и тот же код составления запроса.
            // Его необходимо объединить.
            newRequest['filter'] = this.state.filter;
            this.props.updateRequest(newRequest);
    }, 500);

    render() {
        const params = this.props.request;
        const total = this.props.total;
        const pageIndex = Math.floor(params.offset/params.limit);
        return (
            <div>
                <input
                    placeholder="Фильтр"
                    value={this.state.filter}
                    onChange={this.onFilterChange}
                />

                <button 
                    disabled = { params.offset === 0 }
                    onClick={() => this.setPageIndex(0)}
                > В начало </button>
                <button 
                    disabled = {params.offset === 0}
                    onClick={() => this.setPageIndex(pageIndex - 1)}
                > Назад </button>
                <button 
                    disabled = {params.offset + params.limit >= total}
                    onClick={() => this.setPageIndex(pageIndex + 1)}
                > Вперед </button>
                <button 
                    disabled = {params.offset + params.limit >= total}
                    onClick={() => this.setPageIndex(Math.floor(total/params.limit))}
                > В конец </button>
            </div>
        );
    }
}
