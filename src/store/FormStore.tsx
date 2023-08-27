import { makeAutoObservable, observable, action } from 'mobx';
import axios from 'axios';
import * as XLSX from 'xlsx';

type IRecData = {
    filename: string,
    predicted_target_value: number,
    social_media_type: string
}

export default class FormStore {
    @observable step = 0;
    @observable selectedFile: File | null = null;
    @observable socialMediaType: string = 'yt';
    @observable receivedData: Array<IRecData> = [];
    socialMediaOptions = [
        { value: 'yt', label: 'YouTube', src: '/icons/youtube.svg' },
        { value: 'vk', label: 'VK', src: '/icons/vk.svg' },
        { value: 'zn', label: 'Dzen', src: '/icons/dzen.svg' },
        { value: 'tg', label: 'Telegram', src: '/icons/tg.svg' }
    ];
    usageMode = 0;
    @observable loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    changeSocialMediaType(socialMediaType: string) {
        this.socialMediaType = socialMediaType!;
    }

    @action setLoading(val: boolean) {
        this.loading = val;
    }

    @action setFile(file: any) {
        this.selectedFile = file;
    }

    @action nextStep() {
        if (this.step < 3) {
            this.step += 1;
        }
    }

    @action resetStore() {
        this.step = 0;
        this.loading = false;
        this.socialMediaType = 'yt';
        this.receivedData = [];
    }

    downloadExcelSheet() {
        const worksheet = XLSX.utils.json_to_sheet(this.receivedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Лист1");
        XLSX.writeFile(workbook, "download.xlsx");
    }

    uploadDataToAPI() {
        let formData = new FormData();
        this.loading = true;
        console.log(this.socialMediaType);
        console.log(this.selectedFile);
        formData.set('social_media_type', this.socialMediaType);
        formData.set('file', this.selectedFile!);

        axios.post('http://localhost:8080/api/analyze', formData)
            .then((res) => {
                this.receivedData = res.data;
                this.loading = false;
                this.nextStep();
            })
    }
}