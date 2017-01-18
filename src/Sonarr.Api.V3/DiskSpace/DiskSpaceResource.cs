﻿using Sonarr.Http.REST;

namespace Sonarr.Api.V3.DiskSpace
{
    public class DiskSpaceResource : RestResource
    {
        public string Path { get; set; }
        public string Label { get; set; }
        public long FreeSpace { get; set; }
        public long TotalSpace { get; set; }
    }
}
