import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';

class AlbumListFilter extends React.Component {

    setPageIndex(pageIndex) {
        // TODO: Постараться переписать с использованием <Redirect/>
        let newRequest = { 
            pageIndex: pageIndex,
            pageSize: this.props.request.limit
        };
        if (this.props.request.filter) {
            newRequest.filter = this.props.request.filter;
        }
        // TODO: Логику составления ссылки вынести в отдельный модуль.
        // TODO: Вынести редирект с отдельный модуль.
        this.props.history.push('/?'+queryString.stringify(newRequest));
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
        // TODO: Вынести редирект с отдельный модуль.
        // console.log ('newRequest: ', newRequest);
        this.props.history.push('/?'+queryString.stringify(newRequest));        
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

const mapStateToProps = state => ({
    request: state.albumList.request.params,
    total: state.albumList.response.total
});

const mapDispatchToProps = dispatch => ({
    // increment: () => dispatch(increment()),
    // decrement: () => dispatch(decrement()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumListFilter);
