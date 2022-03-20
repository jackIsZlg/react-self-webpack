import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCount, delCount } from '@/store/sync/action';

import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

import Pdfh5 from "pdfh5";

// import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.5.207/pdf.worker.min.js`;

import S from './index.m.less';

class Home extends Component {

    state = {
        currentPage: 1
    }

    componentDidMount() {
        this.getData();

        new Pdfh5("#demo", {
            pdfurl: "https://cdn.weipaitang.com/static/public/20210417240ebf99-8c3a-bf998c3a-a2da-667eb1435403.pdf"
        });
    }
    
    async getData() {
        // showError为false的时候就自己来处理错误
        const data = await React.$axios('post', 'http://122.51.66.155:3000/post/user', { showError: false });
        const list = await React.$axios('GET', 'http://122.51.66.155:3000/list');
    }
    
    onDocumentLoadSuccess = ({ numPages }) => { //numPages是总页数
        this.setState({ numPages });
    };

    render() {
        const { count, addCount1, delCount1 } = this.props;
        return (
            <div className={S.home}>
                home
                <div className={S.num}>
                    当前统计到的数值：
                    {count}
                </div>
                <button className={S.button} onClick={addCount1}>增加</button>
                <button className={S.button} onClick={delCount1}>删除</button>

                {/* <Document
                    file={'./1.pdf'}//文档地址
                    loading=""
                    onLoadSuccess={this.onDocumentLoadSuccess}
                >
                    <Page
                        key={this.state.currentPage}
                        pageNumber={this.state.currentPage} //当前页页码
                        width={850}
                    />
                </Document> */}

                <Document
                    file="https://cdn.weipaitang.com/static/public/20210417240ebf99-8c3a-bf998c3a-a2da-667eb1435403.pdf"
                    onLoadSuccess={this.onDocumentLoadSuccess}
                >
                    <Page pageNumber={this.state.currentPage} />
                </Document>
                <div id="demo"></div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    count: state.reducer.count,
    items: state.todos
});

const mapDispatchToProps = (dispatch) => ({
    addCount1: () => {
        dispatch(addCount());
    },
    delCount1: () => {
        dispatch(delCount());
    },
    // delExact: (parmas) => {
    //     dispatch(delExact(parmas))
    // },
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
