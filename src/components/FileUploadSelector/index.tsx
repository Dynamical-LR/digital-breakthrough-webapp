import React, { ChangeEvent } from 'react';
import { observer } from 'mobx-react';

import {
    Button,
    Grid,
    CircularProgress
} from '@mui/joy';

import FormStore from '../../store/FormStore';

type IProps = {
    formStore: FormStore
}

@observer
class FileUploadSelector extends React.Component<IProps, any> {
    constructor(props: IProps) {
        super(props);
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            this.props.formStore.setFile(e.target.files[0]);
        }
    }

    render() {
        const { props } = this;
        return (
            <div>
                {this.props.formStore.loading ? (<CircularProgress />) :
                    (<div>
                        <Grid xs={12} className='row'>
                            <h1>Теперь загрузите .zip архив с изображениями панелей</h1>
                        </Grid>
                        <Grid xs={12} className='row'>
                            <Button color='success' component='label'>
                                Загрузить .zip файл
                                <input type='file' hidden onChange={this.handleFileChange} />
                            </Button>
                            {props.formStore.selectedFile !== null ? (
                                <p>Выбран: {props.formStore.selectedFile.name}</p>
                            ) : (<></>)}
                        </Grid>
                        <Grid xs={12} className='row'>
                            <Button onClick={() => { this.props.formStore.uploadDataToAPI() }}>Отправить</Button>
                        </Grid>
                    </div>
                    )
                }
            </div>
        );
    }
}

export default FileUploadSelector;