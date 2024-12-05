import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const Loading = ({  }) => {
    return <>
        <Spin
            fullscreen
            indicator={
                <LoadingOutlined
                    style={{
                        fontSize: 48,
                    }}
                    spin
                />
            }
        />
    </>
};

export default Loading;