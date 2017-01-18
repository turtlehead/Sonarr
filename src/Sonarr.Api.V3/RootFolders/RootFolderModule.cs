﻿using System.Collections.Generic;
using FluentValidation;
using NzbDrone.Core.RootFolders;
using NzbDrone.Core.Validation.Paths;
using NzbDrone.SignalR;
using Sonarr.Http;
using Sonarr.Http.Mapping;

namespace Sonarr.Api.V3.RootFolders
{
    public class RootFolderModule : SonarrRestModuleWithSignalR<RootFolderResource, RootFolder>
    {
        private readonly IRootFolderService _rootFolderService;

        public RootFolderModule(IRootFolderService rootFolderService,
                                IBroadcastSignalRMessage signalRBroadcaster,
                                RootFolderValidator rootFolderValidator,
                                PathExistsValidator pathExistsValidator,
                                DroneFactoryValidator droneFactoryValidator,
                                MappedNetworkDriveValidator mappedNetworkDriveValidator)
            : base(signalRBroadcaster)
        {
            _rootFolderService = rootFolderService;

            GetResourceAll = GetRootFolders;
            GetResourceById = GetRootFolder;
            CreateResource = CreateRootFolder;
            DeleteResource = DeleteFolder;

            SharedValidator.RuleFor(c => c.Path)
                           .Cascade(CascadeMode.StopOnFirstFailure)
                           .IsValidPath()
                           .SetValidator(rootFolderValidator)
                           .SetValidator(droneFactoryValidator)
                           .SetValidator(mappedNetworkDriveValidator)
                           .SetValidator(pathExistsValidator);
        }

        private RootFolderResource GetRootFolder(int id)
        {
            return _rootFolderService.Get(id).InjectTo<RootFolderResource>();
        }

        private int CreateRootFolder(RootFolderResource rootFolderResource)
        {
            return GetNewId<RootFolder>(_rootFolderService.Add, rootFolderResource);
        }

        private List<RootFolderResource> GetRootFolders()
        {
            return ToListResource(_rootFolderService.AllWithUnmappedFolders);
        }

        private void DeleteFolder(int id)
        {
            _rootFolderService.Remove(id);
        }
    }
}