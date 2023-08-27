import React from 'react';
import {
    Grid,
    Select,
    Button,
    ListItemDecorator,
    Option,
    Avatar,
    ListDivider
} from '@mui/joy';
import { observer } from 'mobx-react';
import FormStore from '../../store/FormStore';
type IProps = {
    formStore: FormStore
}

@observer
class SocialMediaSelector extends React.Component<IProps, any> {
    constructor(props: IProps) {
        super(props);
        this.renderValue = this.renderValue.bind(this);
    }
    renderValue(option: any) {
        return (
            <React.Fragment>
                <ListItemDecorator>
                    <Avatar size="sm" src={this.props.formStore.socialMediaOptions.find((o: any) => o.value === option.value)?.src} />
                </ListItemDecorator>
                <div style={{ textAlign: 'center' }}>
                    {option.label}
                </div>
            </React.Fragment>
        );
    }
    render() {
        return (
            <div>
                <Grid xs={12}>
                    <h1>Выберите соцсеть</h1>
                </Grid>
                <Grid xs={12} className='row'>
                    <Select defaultValue={'yt'}
                        style={{backgroundColor: 'transparent', color: 'white'}}
                        slotProps={{
                            listbox: {
                                sx: {
                                    '--ListItemDecorator-size': '44px',
                                },
                            },
                        }}
                        sx={{
                            '--ListItemDecorator-size': '44px',
                            minWidth: 240,
                        }}
                        value={this.props.formStore.socialMediaType}
                        renderValue={this.renderValue}
                        onChange={(e, n) => { this.props.formStore.changeSocialMediaType(n!) }}
                    >
                        {this.props.formStore.socialMediaOptions.map((option: any, index: any) => (
                            <React.Fragment key={option.value}>
                                {index !== 0 ? <ListDivider role="none" inset="startContent" /> : null}
                                <Option value={option.value} label={option.label}>
                                    <ListItemDecorator>
                                        <Avatar size="sm" src={option.src} />
                                    </ListItemDecorator>
                                    <div style={{ textAlign: 'center' }}>
                                        {option.label}
                                    </div>
                                </Option>
                            </React.Fragment>
                        ))}
                    </Select>
                </Grid>
                <Grid xs={12} className={'row'}>
                    <Button onClick={() => { this.props.formStore.nextStep(); }}>Выбрать</Button>
                </Grid>
            </div >
        )
    }
}


export default SocialMediaSelector;