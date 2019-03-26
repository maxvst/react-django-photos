import React from 'react';
import debounce from '../misc/debounce';

export default class extends React.Component {    
    state = {
        filter: '',
        lastFilterFromProps: ''
    };

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

    // getInitialState (props) {
    static getDerivedStateFromProps(props, state) {
        const filter = props.request.filter || '';
        if (filter !== state.lastFilterFromProps) {
            console.log ('update state:', props)
            return {
                filter,
                lastFilterFromProps: filter
            };
        }
        console.log ('nothing to update', props);
        return null;
    }
    
    onFilterChange = (evt) => {
        const newState = {...this.state, filter: evt.target.value};
        this.setState(newState, () => { /* console.log ('state set: ', this.state)*/ });
        this.filterDebounce(evt.target.value);
    }

    filterDebounce = debounce(value => {
            let newRequest = { 
                pageIndex: this.props.request.pageIndex,
                pageSize: this.props.request.limit
            };
            if (this.props.request.filter) {
                newRequest.filter = this.props.request.filter;
            }
            // TODO: здесь и в методе setPageIndex используется один и тот же код составления запроса.
            // Его необходимо объединить.
            newRequest['filter'] = this.state.filter;
            this.props.updateRequest(newRequest);
    }, 500);

    render() {
        // TODO: Render вызывается слишком много раз при первичном отображении страницы.
        // изучить, как можно уменьшить количество.
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
