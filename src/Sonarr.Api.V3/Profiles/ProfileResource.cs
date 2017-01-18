﻿using System.Collections.Generic;
using NzbDrone.Core.Parser;
using NzbDrone.Core.Qualities;
using Sonarr.Http.REST;

namespace Sonarr.Api.V3.Profiles
{
    public class ProfileResource : RestResource
    {
        public string Name { get; set; }
        public Quality Cutoff { get; set; }
        public List<ProfileQualityItemResource> Items { get; set; }
        public Language Language { get; set; }
    }

    public class ProfileQualityItemResource : RestResource
    {
        public Quality Quality { get; set; }
        public bool Allowed { get; set; }
    }
}