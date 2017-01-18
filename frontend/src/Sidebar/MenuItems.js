module.exports = [
    {
        title : 'Series',
        icon  : 'series',
        href  : '/',
        items : [
            {
                title : 'Add New',
                href  : '/addseries'
            },
            {
                title : 'Editor',
                href  : '/serieseditor'
            },
            {
                title : 'Season Pass',
                href  : '/seasonpass'
            }
        ]
    },
    {
        title : 'Calendar',
        icon  : 'calendar',
        href  : '/calendar'
    },
    {
        title : 'Activity',
        icon  : 'activity',
        href  : '/activity/history',
        items : [
            {
                title : 'Queue',
                href  : '/activity/queue'
            },
            {
                title : 'Blacklist',
                href  : '/activity/blacklist'
            }
        ]
    },
    {
        title : 'Wanted',
        icon  : 'wanted',
        href  : '/wanted/missing',
        items : [
            {
                title : 'Cutoff Unmet',
                href  : '/wanted/cutoff'
            }
        ]
    },
    {
        title : 'Settings',
        icon  : 'settings',
        href  : '/settings/ui',
        items : [
            {
                title : 'Media Management',
                href  : '/settings/mediamanagement'
            },
            {
                title : 'Profiles',
                href  : '/settings/profiles'
            },
            {
                title : 'Quality',
                href  : '/settings/quality'
            },
            {
                title : 'Indexers',
                href  : '/settings/indexers'
            },
            {
                title : 'Download Clients',
                href  : '/settings/downloadclient'
            },
            {
                title : 'Connect',
                href  : '/settings/connect'
            },
            {
                title : 'Metadata',
                href  : '/settings/metadata'
            },
            {
                title : 'General',
                href  : '/settings/general'
            }
        ]
    },
    {
        title : 'System',
        icon  : 'system',
        href  : '/system/status',
        items : [
            {
                title : 'Tasks',
                href  : '/system/tasks'
            },
            {
                title : 'Backup',
                href  : '/system/backup'
            },
            {
                title : 'Updates',
                href  : '/system/updates'
            },
            {
                title : 'Logs',
                href  : '/system/logs'
            }
        ]
    }
];
