import React from 'react';
import { observer } from 'mobx-react';
import FormStore from '../../store/FormStore';
import { Button, Table, Grid } from '@mui/joy';

type IProps = {
    formStore: FormStore
}

@observer
class TableDisplay extends React.Component<IProps, any> {
    render() {
        return (
            <div>
                <Table aria-label="basic table" style={{ backgroundColor: 'white', margin: '15px' }}>
                    <thead>
                        <tr>
                            <th>Имя файла</th>
                            <th>Предсказываемая величина</th>
                            <th>Соцсеть</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.formStore.receivedData.map((val) => (
                            <tr>
                                <td>{val.filename}</td>
                                <td>{val.predicted_target_value}</td>
                                <td><img alt={val.filename} style={{ maxHeight: '44px' }} src={this.props.formStore.socialMediaOptions.find(v => v.value === val.social_media_type)!.src} /></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Grid xs={12} className='row'>
                    <Button color='success' onClick={() => this.props.formStore.downloadExcelSheet()}>Скачать XLSX файл</Button>
                </Grid>
                <Grid xs={12} className='row'>
                    <Button onClick={() => { this.props.formStore.resetStore() }}>Повторить</Button>
                </Grid>
            </div>
        );
    }
}

export default TableDisplay;