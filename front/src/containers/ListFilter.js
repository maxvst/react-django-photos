import React from 'react';

// module.exports = class extends React.Component {
// export default class ListFilter extends React.Component {
export default class extends React.Component {    
    // constructor(props) {
    //     super(props);
    //     this.state = { filter: '' };
    // }

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

    static getDerivedStateFromProps(props) {
        // TODO: найти причину, по которой props.request.filter может передаваться сюда неопределенным.
        // TODO: исправить эту ситуацию.
        return { filter: props.request.filter || '' };
    }

    onFilterChange = evt => {
        let newRequest = { 
            pageIndex: this.props.request.pageIndex,
            pageSize: this.props.request.limit
        };
        if (this.props.request.filter) {
            newRequest.filter = this.props.request.filter;
        }
        // TODO: здесь и в методе выше используется один и тот же код составления запроса.
        // Его необходимо объединить.
        newRequest['filter'] = evt.target.value;
        this.props.updateRequest(newRequest);
    };

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
