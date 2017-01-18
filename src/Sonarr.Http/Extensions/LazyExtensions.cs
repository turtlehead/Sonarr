﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using NzbDrone.Common.Cache;
using NzbDrone.Core.Datastore;
using Sonarr.Http.Mapping;
using Sonarr.Http.REST;

namespace Sonarr.Http.Extensions
{
    public static class LazyExtensions
    {
        private static readonly ICached<MethodInfo> SetterCache = new Cached<MethodInfo>();

        public static IEnumerable<TParent> LoadSubtype<TParent, TChild, TSourceChild>(this IEnumerable<TParent> parents, Func<TParent, int> foreignKeySelector, Func<IEnumerable<int>, IEnumerable<TSourceChild>> sourceChildSelector)
            where TSourceChild : ModelBase, new()
            where TChild : RestResource, new()
            where TParent : RestResource
        {
            var parentList = parents.Where(p => foreignKeySelector(p) != 0).ToList();

            if (!parentList.Any())
            {
                return parents;
            }

            var ids = parentList.Select(foreignKeySelector).Distinct();
            var childDictionary = sourceChildSelector(ids).ToDictionary(child => child.Id, child => child);

            var childSetter = GetChildSetter<TParent, TChild>();

            foreach (var episode in parentList)
            {
                childSetter.Invoke(episode, new object[] { childDictionary[foreignKeySelector(episode)].InjectTo<TChild>() });
            }

            return parents;
        }


        private static MethodInfo GetChildSetter<TParent, TChild>()
            where TChild : RestResource
            where TParent : RestResource
        {
            var key = typeof(TChild).FullName + typeof(TParent).FullName;

            return SetterCache.Get(key, () =>
                {
                    var property = typeof(TParent).GetProperties().Single(c => c.PropertyType == typeof(TChild));
                    return property.GetSetMethod();
                });
        }
    }
}
