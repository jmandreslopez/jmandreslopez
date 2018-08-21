import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { BlankLayoutComponent } from './layouts/blank';
import { NormalLayoutComponent } from './layouts/normal';

const routes: Routes = [
    {
        // Normal Layout
        path: '',
        component: NormalLayoutComponent,
        children: [
            { path: '', pathMatch: 'full', loadChildren: 'src/app/modules/home/home.module#HomeModule' },
            { path: 'about', loadChildren: 'src/app/modules/about/about.module#AboutModule' },
        ]
    },
    {
        // Blank Layout
        path: '',
        component: BlankLayoutComponent,
        children: [
            { path: '404', loadChildren: 'src/app/modules/not-found/not-found.module#NotFoundModule' },
        ],
    },

    // Handle all other routes
    { path: '**', redirectTo: '/404' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
    //
}
