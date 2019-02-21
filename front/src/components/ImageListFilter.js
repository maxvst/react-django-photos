import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';

// TODO: Объединить ImageListFilter и BaseListFiler в один компонент
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
        console.log('this:', this);
        // TODO: Логику составления ссылки вынести в отдельный модуль.
        this.props.history.push(`/base/${this.props.baseId}/?${queryString.stringify(newRequest)}`);
    }

    render() {
        const params = this.props.request;
        const total = this.props.total;
        const pageIndex = Math.floor(params.offset/params.limit);
        return (
            <div>
                <input></input>
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
    request: state.base.request.params,
    total: state.base.response.total
});

const mapDispatchToProps = dispatch => ({
    // increment: () => dispatch(increment()),
    // decrement: () => dispatch(decrement()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageListFilter);