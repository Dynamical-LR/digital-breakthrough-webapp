import React from 'react';
import {
    Box,
    Grid,
    Avatar,
    ListItemDecorator
} from '@mui/joy';
import { observer } from 'mobx-react';
import SocialMediaSelector from '../../components/SocialMediaSelector';
import FileUploadSelector from '../../components/FileUploadSelector';
import TableDisplay from '../../components/TableDisplay';

import './index.css';
import FormStore from '../../store/FormStore';

type IProps = {
    formStore: FormStore
}

@observer
class IndexPage extends React.Component<IProps, any> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            steps: [
                <SocialMediaSelector formStore={props.formStore} />,
                <FileUploadSelector formStore={props.formStore} />,
                <TableDisplay formStore={props.formStore} />
            ]
        }
    }

    renderValue(option: any) {
        return (
            <React.Fragment>
                <ListItemDecorator>
                    <Avatar size="sm" src={this.state.socialMediaOptions.find((o: any) => o.value === option.value)?.src} />
                </ListItemDecorator>
                {option.label}
            </React.Fragment>
        );
    }

    render() {
        return (
            <div>
                <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' minHeight={'100vh'}>
                    <Grid xs={12} className='row' style={{ marginTop: '100px' }}>
                        <img alt='topblog' src={'/icons/topblog.svg'}></img>
                    </Grid>
                    {this.state.steps[this.props.formStore.step]}
                </Box>
            </div>
        )
    }
}

export default IndexPage;