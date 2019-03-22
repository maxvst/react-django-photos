import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';

// TODO: Объединить ImageListFilter и AlbumListFiler в один компонент
class ImageListFilter extends React.Component {

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
        this.props.history.push(`/album/${this.props.albumId}/?${queryString.stringify(newRequest)}`);
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
        this.props.history.push(`/album/${this.props.albumId}/?${queryString.stringify(newRequest)}`);
        // this.props.history.push('/album?'+queryString.stringify(newRequest));        
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
    request: state.album.request.params,
    total: state.album.response.total
});

const mapDispatchToProps = dispatch => ({
    // increment: () => dispatch(increment()),
    // decrement: () => dispatch(decrement()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageListFilter);
