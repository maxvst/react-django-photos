import React from 'react';

export default class ListFilter extends React.Component {

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

    onInputChange = evt => {
        let newRequest = { 
            pageIndex: this.props.request.pageIndex,
            pageSize: this.props.request.limit
        };
        if (this.props.request.filter) {
            newRequest.filter = this.props.request.filter;
        }
        // TODO: здесь и в методе выше используется один и тот же код составления запроса.
        // Его необходимо объединить.
        newRequest[evt.target.name] = evt.target.value;
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
                    name="filter"
                    value={this.props.request.filter}
                    onChange={this.onInputChange}
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
