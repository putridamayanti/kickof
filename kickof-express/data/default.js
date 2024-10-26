exports.ROLE_DEFAULT_DATA = [
    {
        id: '795d1bc5-591b-4c08-a716-591c9ad75c83',
        name: 'Admin',
        code: 'admin'
    }
];

exports.USER_DEFAULT_DATA = [
    {
        id: '814500ac-aea8-434c-b77d-182b51ade1d2',
        name: 'Admin',
        email: 'admin@skeleton.com',
        password: 'admin',
        roleId: '795d1bc5-591b-4c08-a716-591c9ad75c83'
    }
];

exports.SETTING_DEFAULT_DATA = [
    {
        id: 'b0714389-8d36-44a9-9486-3389f6882f8a',
        code: 'profile',
        name: 'Company Profile',
        setting: {
            name: 'Express Skeleton',
            email: 'cs@skeleton.com',
        }
    },
    {
        id: 'dc581474-a7b8-4f4f-a555-029641f95bd2',
        code: 'storage',
        name: 'Object Storage (For media)',
        setting: {
            current: 'local', // local or cloudinary
            cloudinaryCloudName: '',
            cloudinaryApiKey: '',
            cloudinaryApiSecret: ''
        }
    },
];